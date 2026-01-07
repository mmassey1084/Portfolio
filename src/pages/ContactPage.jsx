import PanelSection from "../components/PanelSection.jsx";
import { profileData } from "../data/profile.js";

export default function ContactPage() {
  const { contact, links } = profileData;

  const email = contact.emailAddress;
  const subject = "Portfolio inquiry";
  const body = "Hi Michael,%0D%0A%0D%0A"; 

  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent("Hi Michael,\n\n")}`;

  function openEmail(e) {
    window.location.href = mailtoHref;

    window.setTimeout(() => {
      window.open(gmailComposeUrl, "_blank", "noopener,noreferrer");
    }, 10);
  }

  function handleContactFormSubmit(event) {
    event.preventDefault();
    // Wire this up later (EmailJS/Formspree/backend)
  }

  return (
    <div className="grid" style={{ gap: 16 }}>
      <PanelSection title="Contact">
        <div className="grid grid-2">
          <div className="card">
            <strong>Reach me</strong>
            <p>Email: {email}</p>
            <p>Phone: {contact.phoneNumber}</p>

            <div className="btn-row">
              <a className="btn" href={links.linkedInUrl} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="btn" href={links.githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>

              {/* Use a button to run fallback logic */}
              <button type="button" className="btn btn-primary" onClick={openEmail}>
                Email Me
              </button>
            </div>
          </div>

          <form className="card" onSubmit={handleContactFormSubmit}>
            <strong>Message me</strong>

            <label className="label" htmlFor="senderNameInput">
              Name
            </label>
            <input id="senderNameInput" className="input" placeholder="Your name" />

            <label className="label" htmlFor="senderEmailInput">
              Email
            </label>
            <input id="senderEmailInput" className="input" placeholder="you@example.com" />

            <label className="label" htmlFor="messageBodyInput">
              Message
            </label>
            <textarea id="messageBodyInput" className="textarea" placeholder="What can I help with?" />

            <div className="btn-row">
              <button className="btn btn-primary" type="submit">
                Send (wire this later)
              </button>
             
            </div>

            <div className="btn-row" style={{ marginTop: 8 }}>
              <a className="btn" href={gmailComposeUrl} target="_blank" rel="noreferrer">
                Open Gmail compose
              </a>
            </div>
          </form>
        </div>
      </PanelSection>
    </div>
  );
}

