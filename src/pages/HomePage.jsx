import { useEffect, useRef, useState } from "react";
import TopNavigation from "../components/TopNavigation.jsx";

import ProfileHeader from "../components/ProfileHeader.jsx";
import PanelSection from "../components/PanelSection.jsx";
import { profileData } from "../data/profile.js";
import AccordionGroup from "../components/AccordionGroup.jsx";
import AccordionItem from "../components/AccordionItem.jsx";
import ChurchStudioLogo from "../assets/New_Logo.png";
import WorldWideTech from "../assets/tech.png";
import HeroImg from "../assets/hero-photo.png";

export default function HomePage() {
  const entryRef = useRef(null);
  const contentRef = useRef(null);
  const [navVisible, setNavVisible] = useState(false);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  // ✅ Nav shows when the entry is NOT on screen
  useEffect(() => {
    const currentEntryRef = entryRef.current;
    if (!currentEntryRef) return;

    const interObs = new IntersectionObserver(
      ([entry]) => {
        setNavVisible(!entry.isIntersecting);
      },
      { threshold: 0.35 } 
    );

    interObs.observe(currentEntryRef);
    return () => interObs.disconnect();
  }, []);

  return (
    <div className="home">
      {navVisible && <TopNavigation />}

      <section ref={entryRef} className="entry">
        <div className="entry-content">
          <img src={HeroImg} alt="coding photo" className="hero-img" />
          <h1>Michael Massey</h1>
          <p>Front-End & Full-Stack Developer/Software Developer</p>
        </div>

        <button className="scroll-btn" onClick={scrollToContent}>
          View My Work ↓
        </button>
      </section>

      <main ref={contentRef} id="content" className="container" role="main">
        <div className="grid" style={{ gap: 16 }}>
          <ProfileHeader />

          <div className="grid grid-2">
            <PanelSection title="Specialties & Services">
              <div className="grid">
                {profileData.specialties.map((specialtyText) => (
                  <div key={specialtyText.title} className="card">
                    <strong>{specialtyText.title}</strong>
                    <p>{specialtyText.description}</p>
                  </div>
                ))}
              </div>

              <div className="btn-row">
                <a className="btn btn-primary" href="/projects">
                  View Projects
                </a>
                <a className="btn" href="/contact">
                  Contact Me
                </a>
              </div>
            </PanelSection>

            <PanelSection title="Skills">
              <div className="pills" style={{ marginTop: 0 }}>
                {profileData.skills.map((skillLabel) => (
                  <span key={skillLabel} className="pill">
                    {skillLabel}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: 12 }}>
                <strong>Quantifiable Achievements</strong>
                <ul style={{ color: "var(--muted)", marginTop: 8 }}>
                  {profileData.achievements.map((achievementText) => (
                    <li key={achievementText}>{achievementText}</li>
                  ))}
                </ul>
              </div>
            </PanelSection>
          </div>

          <div className="grid grid-2">
            <PanelSection title="Education & Certificates">
              <div className="grid">
                {profileData.education.map((educationItem) => (
                  <div key={educationItem.schoolName} className="card">
                    <strong>{educationItem.schoolName}</strong>
                    <p>{educationItem.programDetail}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 12 }}>
                <strong>Certificates</strong>
                <ul style={{ color: "var(--muted)", marginTop: 8 }}>
                  {profileData.certifications.map((certificateText) => (
                    <li key={certificateText}>{certificateText}</li>
                  ))}
                </ul>
              </div>
            </PanelSection>

            <PanelSection title="Testimonials • Awards • Community">
              <div className="grid">
                <div className="card">
                  <strong>Testimonial</strong>
                  <p>
                    “Michael has completed several of my advanced courses,
                    including Mobile App Development with React, Web Design and
                    Implementation, and Machine Learning for Information
                    Professionals. In each of these classes, he not only earned
                    top grades but also stood out as one of the most engaged,
                    capable, and self motivated students I have worked with. He
                    consistently demonstrated strong technical skills, creative
                    problem-solving, and the ability to grasp complex concepts
                    with ease. ”
                  </p>
                  <p style={{ marginTop: 10 }}>— Yasser Youssef, Ph.D.</p>
                  <p>
                    “Michael quickly proved himself to be a reliable and
                    thoughtful developer. He was able to take ideas and
                    requirements and turn them into clean, functional features,
                    while also paying close attention to usability and
                    accessibility. He asks great questions, takes feedback
                    seriously, and consistently delivers quality work. I
                    appreciated how proactive he was in improving both the
                    codebase and the overall user experience. ”
                  </p>
                  <p style={{ marginTop: 10 }}>
                    — Teresa Knox , CEO at The Church Studio
                  </p>
                </div>

                <div className="card">
                  <strong>Awards / Recognition</strong>
                  <ul>
                    <li>Dean's Honor Roll - Fall 2023</li>
                    <li>Dean's Honor Roll - Spring 2024</li>
                  </ul>
                </div>

                <div className="card">
                  <strong>Leadership / Communities</strong>
                  <p>Coding Club at Tulsa Community College</p>
                </div>
              </div>
            </PanelSection>
          </div>

          <PanelSection title="Process (How I Work)">
            <div className="grid grid-3">
              <div className="card">
                <strong>1) Discover</strong>
                <p>Goals, requirements, audience, talk to stakeholders.</p>
              </div>
              <div className="card">
                <strong>2) Design</strong>
                <p>Wireframe, UI system, accessibility.</p>
              </div>
              <div className="card">
                <strong>3) Build</strong>
                <p>React components, APIs, testing.</p>
              </div>
              <div className="card">
                <strong>4) Ship</strong>
                <p>Deploy, performance, SEO basics.</p>
              </div>
              <div className="card">
                <strong>5) Improve</strong>
                <p>Iterate based on feedback from stakeholders and results.</p>
              </div>
              <div className="card">
                <strong>6) Document</strong>
                <p>README, screenshots, handoff notes.</p>
              </div>
            </div>
          </PanelSection>

          <PanelSection title="Professional Experience">
            <AccordionGroup defaultOpenIndex={0}>
              <AccordionItem
                title="Software Engineer Intern @ The Church Studio"
                date=" August 2025 - Current"
              >
                <div className="accordion-panel-content">
                  <img
                    src={ChurchStudioLogo}
                    alt="The Church Studio logo"
                    className="accordionImg"
                  />
                  <p>
                    As a Software Engineer at The Church Studio, I helped design
                    and build a cross-platform mobile application from the
                    ground up to enhance visitor engagement and accessibility. I
                    worked closely with stakeholders to translate real-world
                    requirements into intuitive mobile features and user flows.
                    My work focused on front-end mobile development using
                    React-based technologies, ensuring the app felt smooth and
                    responsive across devices and back-end technologies such as
                    Node.js. I integrated dynamic content and APIs to support
                    tours, archival information, and interactive experiences
                    within the app. Throughout development, I emphasized
                    performance, usability, and accessibility while iterating on
                    features based on testing and feedback.
                  </p>
                </div>
              </AccordionItem>

              <AccordionItem
                title="Full-Stack Engineer Intern @ World Wide Technologies"
                date=" May 2023 - August 2023"
              >
                <div className="accordion-panel-content">
                  <img
                    src={WorldWideTech}
                    alt="World Wide Technologies logo"
                    className="accordionImg"
                    id="worldTechImg"
                  />
                  <p>
                    As a Full-Stack Engineer at World Wide Technologies, I
                    worked on building and maintaining web application features
                    across both the front end and back end. I developed
                    responsive user interfaces using modern JavaScript, HTML,
                    and CSS while collaborating with team members to integrate
                    server-side functionality. I assisted with API development
                    and data handling to support dynamic application behavior.
                    Throughout my role, I focused on writing clean, maintainable
                    code and improving functionality based on feedback and
                    testing.
                  </p>
                </div>
              </AccordionItem>
            </AccordionGroup>
          </PanelSection>

          <PanelSection title="Contact Me">
            <div className="card">
              <strong>Want to work together?</strong>
              <p>
                I’m actively seeking a full-time Junior Software Engineer role,
                or full-time Junior Full-Stack Engineer role, and I’m also open
                to freelance work and short-term collaborations where I can
                contribute, learn, and grow.
              </p>
              <div className="btn-row">
                <a className="btn btn-primary" href="/contact">
                  Hire / Contact Me
                </a>
                <a
                  className="btn"
                  href={profileData.resumeDownloadUrl}
                  download
                >
                  Download Resume
                </a>
              </div>
            </div>
          </PanelSection>
        </div>
      </main>
    </div>
  );
}
