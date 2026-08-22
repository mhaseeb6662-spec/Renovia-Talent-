import nodemailer from 'nodemailer';

// Create Nodemailer Transporter
const createTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
};

/**
 * Send candidate application confirmation email
 */
export const sendApplicationConfirmationEmail = async ({ candidateEmail, candidateName, jobTitle }) => {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: `"Renovia Talent Careers" <${process.env.FROM_EMAIL || 'careers@renoviatalent.com'}>`,
      to: candidateEmail,
      subject: `Application Received: ${jobTitle} at Renovia Talent`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #05070D; color: #ffffff; padding: 30px; border-radius: 12px;">
          <h2 style="color: #60a5fa; margin-bottom: 10px;">Renovia Talent Careers</h2>
          <p>Dear <strong>${candidateName}</strong>,</p>
          <p>Thank you for submitting your application for the <strong>${jobTitle}</strong> position at Renovia Talent.</p>
          <p>Our recruitment team and AI evaluation engine have successfully received your resume and details. We will review your profile thoroughly and get back to you with the next steps.</p>
          <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0;" />
          <p style="font-size: 12px; color: #94a3b8;">Renovia Talent — Engineering the Future of Technology & Workforce.</p>
        </div>
      `,
    };

    if (transporter) {
      await transporter.sendMail(mailOptions);
      console.log(`✉️ Application confirmation email sent to ${candidateEmail}`);
    } else {
      console.log(`ℹ️ SMTP not configured (SMTP_HOST, SMTP_USER, SMTP_PASS required in .env). Application confirmation email skipped for ${candidateEmail}`);
    }
  } catch (err) {
    console.error('Failed to send candidate confirmation email:', err.message);
  }
};

/**
 * Send client lead confirmation receipt
 */
export const sendLeadReceiptEmail = async ({ clientEmail, clientName, service }) => {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: `"Renovia Talent Advisory" <${process.env.FROM_EMAIL || 'contact@renoviatalent.com'}>`,
      to: clientEmail,
      subject: `Inquiry Received — Renovia Talent`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #05070D; color: #ffffff; padding: 30px; border-radius: 12px;">
          <h2 style="color: #38bdf8; margin-bottom: 10px;">Renovia Talent</h2>
          <p>Dear <strong>${clientName}</strong>,</p>
          <p>Thank you for reaching out regarding <strong>${service || 'our services'}</strong>.</p>
          <p>Our strategic technology advisory team is reviewing your requirements and will reach out to you within 24 business hours to discuss the next steps.</p>
          <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0;" />
          <p style="font-size: 12px; color: #94a3b8;">Renovia Talent | Technology, Talent & Business Solutions</p>
        </div>
      `,
    };

    if (transporter) {
      await transporter.sendMail(mailOptions);
      console.log(`✉️ Lead confirmation email sent to ${clientEmail}`);
    } else {
      console.log(`ℹ️ SMTP not configured (SMTP_HOST, SMTP_USER, SMTP_PASS required in .env). Lead notification skipped for ${clientEmail}`);
    }
  } catch (err) {
    console.error('Failed to send lead confirmation email:', err.message);
  }
};
