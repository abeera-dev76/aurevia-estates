import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>Terms & Conditions</motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}}>Last updated: November 2026</motion.p>
          <nav className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Terms & Conditions</span></nav>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth:800 }}>
          {[
            { title:'1. Acceptance of Terms', body:'By accessing and using the Aurevia Estates website, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use this website.' },
            { title:'2. Services', body:'Aurevia Estates provides real estate brokerage, advisory, and management services in Saudi Arabia. All services are subject to applicable Saudi laws and regulations.' },
            { title:'3. Property Listings', body:'Property information on this website is provided in good faith and is believed to be accurate. However, Aurevia Estates makes no warranty as to the accuracy or completeness of property listings. All details should be independently verified.' },
            { title:'4. Enquiries and Forms', body:'By submitting an enquiry form on this website, you consent to being contacted by Aurevia Estates staff for property-related purposes. We will not use your contact details for unrelated marketing without your explicit consent.' },
            { title:'5. Intellectual Property', body:'All content on this website, including text, images, logos, and design, is the intellectual property of Aurevia Estates and is protected by applicable copyright laws.' },
            { title:'6. Limitation of Liability', body:'Aurevia Estates shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this website or reliance on any information provided herein.' },
            { title:'7. Third-Party Links', body:'Our website may contain links to third-party websites. Aurevia Estates is not responsible for the content or privacy practices of those sites.' },
            { title:'8. Governing Law', body:'These terms are governed by the laws of the Kingdom of Saudi Arabia. Any disputes shall be subject to the exclusive jurisdiction of the courts of Riyadh.' },
            { title:'9. Changes to Terms', body:'Aurevia Estates reserves the right to update these Terms at any time. Continued use of the website constitutes acceptance of the updated terms.' },
            { title:'10. Contact', body:'For any queries regarding these Terms, please contact us at: legal@aureviaestates.com' },
          ].map((s,i) => (
            <motion.div key={i} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.04}} style={{ marginBottom:32 }}>
              <h2 style={{ fontSize:'1.1rem', color:'var(--primary)', marginBottom:10 }}>{s.title}</h2>
              <p style={{ color:'var(--text-muted)', lineHeight:1.8 }}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
