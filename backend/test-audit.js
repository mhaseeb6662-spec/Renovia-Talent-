import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from './models/User.js';
import Blog from './models/Blog.js';
import Job from './models/Job.js';
import Application from './models/Application.js';
import Lead from './models/Lead.js';
import Subscriber from './models/Subscriber.js';
import { seedDatabase } from './seedData.js';
import { analyzeCandidateResume, scoreLeadPriority, generateAIBlog, generateAIJobDescription, getWebsiteAssistantResponse } from './services/aiService.js';

dotenv.config();

const runAudit = async () => {
  console.log('\n==================================================');
  console.log('🧪 STARTING COMPLETE END-TO-END FUNCTIONAL AUDIT');
  console.log('==================================================\n');

  try {
    // 1. Database Connection Check
    console.log('1️⃣ [DATABASE] Connecting to MongoDB...');
    const mongoUri = process.env.MONGO_URI;
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 15000,
      family: 4,
    });
    console.log(`✅ MongoDB Connection Verified: ${conn.connection.host}`);

    // Seed database if needed
    await seedDatabase();

    // 2. Auth Flow Audit
    console.log('\n2️⃣ [AUTHENTICATION] Auditing Admin Login & JWT...');
    const adminUser = await User.findOne({ email: 'admin@renoviatalent.com' }).select('+password');
    if (!adminUser) throw new Error('Admin user not found in database');

    const isMatch = await adminUser.matchPassword('Admin@123456');
    if (!isMatch) throw new Error('Password verification failed for Admin@123456');
    
    const token = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET || 'renovia_jwt_production_secret_key_2026_super_secure', { expiresIn: '1d' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'renovia_jwt_production_secret_key_2026_super_secure');
    if (decoded.id !== adminUser._id.toString()) throw new Error('JWT token verification mismatch');
    console.log('✅ Admin credentials, password hashing (bcrypt), and JWT signing/verification verified.');

    // 3. Careers & Job Management Flow Audit
    console.log('\n3️⃣ [CAREERS & JOBS] Auditing Job CRUD operations...');
    const testJob = await Job.create({
      title: 'Senior Cloud DevOps Specialist (Audit Test)',
      department: 'Engineering',
      location: 'Remote / Global',
      type: 'Full-time',
      workplaceType: 'Remote',
      experienceLevel: 'Senior (5+ Years)',
      salaryRange: '$85,000 - $120,000 USD / Year',
      description: 'Audit test position to verify end-to-end database persistence.',
      responsibilities: ['Architect AWS ECS / EKS clusters', 'Automate GitHub Actions CI/CD'],
      requirements: ['5+ years AWS', 'Terraform', 'Docker', 'Kubernetes'],
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
      isActive: true,
    });
    console.log(`✅ Created test job: ${testJob.title} (ID: ${testJob._id})`);

    // Verify Read
    const fetchedJob = await Job.findById(testJob._id);
    if (!fetchedJob || fetchedJob.title !== testJob.title) throw new Error('Failed to retrieve created job from DB');

    // Update Job
    fetchedJob.salaryRange = '$90,000 - $130,000 USD / Year';
    await fetchedJob.save();
    const updatedJob = await Job.findById(testJob._id);
    if (updatedJob.salaryRange !== '$90,000 - $130,000 USD / Year') throw new Error('Job update failed to persist in DB');
    console.log('✅ Job Create, Read, and Update verified with 100% MongoDB persistence.');

    // 4. Candidate Application & AI Resume Matching Flow Audit
    console.log('\n4️⃣ [ATS & AI RESUME MATCH] Auditing Candidate Application & AI Scoring...');
    const candidateCV = `
      Alex Rivers - Senior Cloud Engineer
      Summary: Cloud architect with 6 years experience specializing in AWS, Docker, Kubernetes, Terraform, CI/CD, and Node.js.
      Experience: Designed multi-region microservices on AWS EKS with Terraform IaC and GitHub Actions CI/CD.
      Education: B.S. Computer Science.
    `;

    const aiEval = await analyzeCandidateResume({
      resumeText: candidateCV,
      candidate: {
        fullName: 'Alex Rivers (Audit Candidate)',
        yearsExperience: '6 years',
        currentRole: 'Senior Cloud Engineer',
        coverLetter: 'Passionate about Kubernetes and cloud architecture.',
      },
      job: updatedJob,
    });

    console.log(`🤖 AI Match Score Result: ${aiEval.aiMatchScore}% (Skills: ${aiEval.aiParsedSkills.join(', ')})`);
    if (aiEval.aiMatchScore < 75 || aiEval.aiParsedSkills.length < 3) {
      throw new Error('AI resume analysis returned invalid or unparseable match score');
    }

    const application = await Application.create({
      job: updatedJob._id,
      jobTitle: updatedJob.title,
      fullName: 'Alex Rivers (Audit Candidate)',
      email: 'alex.rivers.audit@test.com',
      phone: '+1 555 888 9999',
      location: 'Remote',
      yearsExperience: '6 years',
      currentRole: 'Senior Cloud Engineer',
      resumeUrl: '/uploads/resumes/audit-test-resume.pdf',
      resumeOriginalName: 'Alex_Rivers_Resume.pdf',
      status: 'New',
      aiMatchScore: aiEval.aiMatchScore,
      aiScoreBreakdown: aiEval.aiScoreBreakdown,
      aiParsedSkills: aiEval.aiParsedSkills,
      aiStrongMatches: aiEval.aiStrongMatches,
      aiMissingSkills: aiEval.aiMissingSkills,
      aiSummary: aiEval.aiSummary,
    });

    // Update Application Status & Notes
    application.status = 'Shortlisted';
    application.internalNotes.push({
      note: 'Candidate scored high in AWS & Kubernetes. Proceed to technical round.',
      author: 'Renovia Admin',
      createdAt: new Date(),
    });
    await application.save();

    const verifiedApp = await Application.findById(application._id);
    if (verifiedApp.status !== 'Shortlisted' || verifiedApp.internalNotes.length === 0) {
      throw new Error('Application status / notes persistence failure');
    }
    console.log('✅ Candidate Application, AI Match Scoring, Stage Progression, and Notes verified.');

    // 5. Contact Form → Leads CRM & AI Priority Flow Audit
    console.log('\n5️⃣ [CRM & AI LEAD PRIORITY] Auditing Client Lead Submission & Priority Classifier...');
    const leadMessage = 'We need a full dedicated team of 4 senior React and Node.js developers for a $50k enterprise project starting next month.';
    const leadPriorityResult = await scoreLeadPriority({
      name: 'Victoria Stone',
      company: 'Stone Global Ventures',
      service: 'Software Development',
      budget: '$50,000+',
      message: leadMessage,
    });

    console.log(`🤖 AI Lead Priority Result: ${leadPriorityResult.aiPriority} (${leadPriorityResult.aiAnalysis})`);
    if (leadPriorityResult.aiPriority !== 'High') {
      throw new Error(`Expected 'High' priority for enterprise lead, got: ${leadPriorityResult.aiPriority}`);
    }

    const testLead = await Lead.create({
      name: 'Victoria Stone (Audit Lead)',
      email: 'victoria@stoneventures.com',
      company: 'Stone Global Ventures',
      service: 'Software Development',
      budget: '$50,000+',
      message: leadMessage,
      aiPriority: leadPriorityResult.aiPriority,
      aiAnalysis: leadPriorityResult.aiAnalysis,
      status: 'New',
    });

    // Update lead status
    testLead.status = 'Qualified';
    testLead.internalNotes.push({
      note: 'Scheduled initial discovery call for Monday 10 AM.',
      author: 'Renovia Admin',
      createdAt: new Date(),
    });
    await testLead.save();

    const verifiedLead = await Lead.findById(testLead._id);
    if (verifiedLead.status !== 'Qualified' || verifiedLead.internalNotes.length === 0) {
      throw new Error('CRM lead status/notes update failed');
    }
    console.log('✅ Contact form lead generation, AI priority classification, and CRM status updates verified.');

    // 6. Blog CMS & AI Blog Generator Flow Audit
    console.log('\n6️⃣ [BLOG CMS & AI GENERATOR] Auditing AI Blog generator & CMS CRUD...');
    const generatedBlog = await generateAIBlog({
      topic: 'Event-Driven Microservices in Fintech',
      category: 'Software Development',
      author: 'Renovia Editorial',
    });

    if (!generatedBlog.title || !generatedBlog.content || !generatedBlog.slug) {
      throw new Error('AI blog generation produced incomplete article structure');
    }

    const testBlog = await Blog.create(generatedBlog);
    const fetchedBlog = await Blog.findOne({ slug: testBlog.slug });
    if (!fetchedBlog || fetchedBlog.title !== testBlog.title) {
      throw new Error('Blog post creation / slug query failed');
    }
    console.log(`✅ AI Blog Draft generated & saved: "${fetchedBlog.title}" (Slug: ${fetchedBlog.slug})`);

    // 7. AI Job Description Generator Audit
    console.log('\n7️⃣ [AI JOB SPEC GENERATOR] Auditing AI Job Description Generator...');
    const generatedJD = await generateAIJobDescription({
      roleTitle: 'Staff AI Solutions Architect',
      department: 'Engineering',
      experienceLevel: 'Staff Level (6+ Years)',
      workplaceType: 'Remote',
    });
    if (!generatedJD.responsibilities || generatedJD.responsibilities.length === 0) {
      throw new Error('AI Job Description generator produced invalid output');
    }
    console.log(`✅ AI Job Spec generated with ${generatedJD.responsibilities.length} responsibilities and ${generatedJD.requirements.length} requirements.`);

    // 8. AI Website Assistant RAG Chatbot Audit
    console.log('\n8️⃣ [AI CHATBOT] Auditing Website Assistant Knowledge Response...');
    const botReply = await getWebsiteAssistantResponse('What services does Renovia Talent provide?');
    if (!botReply || !botReply.includes('Software') || !botReply.includes('Talent')) {
      throw new Error('AI Website Assistant produced inaccurate company knowledge');
    }
    console.log(`✅ AI Website Assistant verified with authentic Renovia Talent knowledge.`);

    // 9. Dashboard Analytics Telemetry
    console.log('\n9️⃣ [DASHBOARD STATS] Auditing Aggregated Analytics Calculations...');
    const [totalJ, totalA, totalL, totalB] = await Promise.all([
      Job.countDocuments(),
      Application.countDocuments(),
      Lead.countDocuments(),
      Blog.countDocuments(),
    ]);
    console.log(`📊 Current DB Counts: Jobs=${totalJ}, Applications=${totalA}, Leads=${totalL}, Blogs=${totalB}`);
    if (totalJ === 0 || totalB === 0) throw new Error('Database stats aggregation failed');
    console.log('✅ Dashboard aggregate metrics verified directly from MongoDB.');

    // 10. Clean up test records
    console.log('\n🔟 [CLEANUP] Cleaning up temporary audit test records...');
    await Job.findByIdAndDelete(testJob._id);
    await Application.findByIdAndDelete(application._id);
    await Lead.findByIdAndDelete(testLead._id);
    await Blog.findByIdAndDelete(testBlog._id);
    console.log('✅ Test records cleanly pruned.');

    console.log('\n==================================================');
    console.log('🏆 COMPLETE FUNCTIONAL AUDIT: 100% SUCCESS');
    console.log('==================================================\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ AUDIT FAILED WITH ERROR:', error);
    process.exit(1);
  }
};

runAudit();
