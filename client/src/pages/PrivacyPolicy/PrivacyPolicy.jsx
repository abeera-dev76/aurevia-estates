import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>Privacy Policy</motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}}>Last updated: November 2026</motion.p>
          <nav className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Privacy Policy</span></nav>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth:800 }}>
          {[
            { title:'1. Information We Collect', body:'We collect personal information you provide when using our website, including name, phone number, email address, and property enquiry details. We may also collect technical information such as IP addresses and browser data.' },
            { title:'2. How We Use Your Information', body:'Your information is used to respond to enquiries, provide property search services, match you with suitable properties, communicate about Aurevia Estates services, and improve our website and services.' },
            { title:'3. Data Storage', body:'Your enquiry data is securely stored in our internal systems. We use Google Sheets as part of our CRM process, which is access-controlled and available only to authorised Aurevia Estates staff.' },
            { title:'4. Data Sharing', body:'We do not sell, trade, or transfer your personal information to third parties without your consent, except where required by law or to provide the real estate services you have requested.' },
            { title:'5. Cookies', body:'Our website may use cookies to enhance your browsing experience. You can disable cookies in your browser settings, though this may affect some functionality.' },
            { title:'6. Your Rights', body:'You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at privacy@aureviaestates.com.' },
            { title:'7. Changes to This Policy', body:'We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page.' },
            { title:'8. Contact', body:'For privacy-related queries, contact us at: privacy@aureviaestates.com or call +966 11 234 5678.' },
          ].map((s,i) => (
            <motion.div key={i} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.05}} style={{ marginBottom:32 }}>
              <h2 style={{ fontSize:'1.1rem', color:'var(--primary)', marginBottom:10 }}>{s.title}</h2>
              <p style={{ color:'var(--text-muted)', lineHeight:1.8 }}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
