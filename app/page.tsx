"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Linkedin,
  Github,
  Calendar,
  ChevronRight,
  MapPin,
  Instagram,
  DribbbleIcon as Behance,
} from "lucide-react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageCarousel } from "@/components/image-carousel" // Keep for project/blog dialogs
// Removed: import { Carousel, CarouselContent, CarouselItem } from "@shadcn/ui";
import SwiperCarousel from './swiper-carousel';
import HeroBannerCarousel from './hero-banner-carousel';
import { ThemeToggle } from "@/components/theme-toggle"

// Define the type for a project
interface Project {
  title: string;
  description: string;
  date?: string;
  images: string[];
  highlights?: string[];
  note?: string;
  projectLink?: string;
  projectLinks?: { url: string; label: string }[];
  team?: string;
  mentor?: string;
  technologies: string[];
  details?: string;
}

// Placeholder ProjectModal component
const ProjectModal = ({
  project,
  isOpen,
  onClose,
}: {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const disableScroll = () => {
      document.body.style.overflow = "hidden";
    };

    const enableScroll = () => {
      document.body.style.overflow = "";
    };

    if (isOpen) {
      disableScroll();
      window.addEventListener("keydown", handleKeyDown);
    } else {
      enableScroll();
    }

    return () => {
      enableScroll();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="bg-background text-foreground rounded-lg shadow-lg max-w-6xl w-full h-[85vh] overflow-y-auto relative p-6"
        style={{ border: 'none' }}
      >
        <button
          className="fixed top-4 right-4 text-foreground hover:text-muted-foreground text-2xl font-bold z-50"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-foreground">{project.title}</h2>
        <p className="text-sm text-muted-foreground mb-4">Completion: {project.date}</p>
        
        <div className="mb-4 flex justify-center items-center gap-6">
          <div className="w-[420px] h-[320px] px-12 py-0 flex items-center justify-center rounded-lg">
            <div className="w-[320px] h-[320px] relative">
              <SwiperCarousel images={project.images} />
            </div>
          </div>
          {(project.projectLink || project.projectLinks) && (
            <div className="flex flex-col items-center gap-3">
              {project.projectLinks ? (
                // Multiple links layout
                project.projectLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                  >
                    <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {link.label}
                  </a>
                ))
              ) : (
                // Single link layout
                <a 
                  href={project.projectLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Project
                </a>
              )}
              <p className="text-xs text-muted-foreground mt-2 text-center">View complete project<br />details on LinkedIn</p>
            </div>
          )}
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-bold mb-2 text-foreground">Description</h4>
          <p className="text-base mb-4 text-foreground">{project.description}</p>
        </div>
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-4">
            <h4 className="text-lg font-bold mb-2 text-foreground">Key Highlights:</h4>
            <ul className="list-disc pl-5 mb-4">
              {project.highlights.map((highlight: string, index: number) => (
                <li key={index} className="text-base mb-2 text-foreground">{highlight}</li>
              ))}
            </ul>
          </div>
        )}
        {project.team && (
          <p className="text-base mb-2 text-foreground"><span className="font-semibold">Team Members:</span> {project.team}</p>
        )}
        {project.mentor && (
          <p className="text-base mb-2 text-foreground"><span className="font-semibold">Mentor:</span> {project.mentor}</p>
        )}
        <p className="text-base text-muted-foreground">{project.note}</p>
      </div>
    </div>
  );
};

const CollegeProjectsSection = ({
  projects,
  selectedProject,
  setSelectedProject,
}: {
  projects: Project[];
  selectedProject: Project | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
}) => {
  return (
    <div className="py-20 px-6 bg-white text-black">
      <h2 className="text-3xl font-bold text-center mb-16">College Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm relative"
            onClick={() => setSelectedProject(project)}
          >
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-48 object-cover rounded-t-lg no-select"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{project.title}</h3>
            </div>
            <span
              className="absolute bottom-2 right-4 text-xs font-semibold text-muted-foreground bg-white/80 px-2 py-1 rounded shadow border border-border pointer-events-none select-none"
            >
              Show More
            </span>
          </div>
        ))}
      </div>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

// Updated the PersonalProjectsSection to not display detailed content on the cover page
const PersonalProjectsSection = ({
  projects,
  selectedProject,
  setSelectedProject,
}: {
  projects: Project[];
  selectedProject: Project | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
}) => {
  return (
    <div className="py-20 px-6 bg-gray-100 text-black">
      <h2 className="text-3xl font-bold text-center mb-16">Personal Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200 rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm"
          >
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-48 object-cover rounded-t-lg no-select"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{project.title}</h3>
            </div>
          </div>
        ))}
      </div>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPersonalProject, setSelectedPersonalProject] = useState<Project | null>(null);

  useEffect(() => {
    setMounted(true)
  }, [])

  const sections = [
    { id: "hero", label: "Home" },
    { id: "projects", label: "Projects" },
    // Removed 'skills' from navigation
    { id: "experience", label: "Experience" },
    { id: "certificates", label: "Certificates" },
    { id: "blogs", label: "Blogs" },
  ]

  const bannerImages = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];

  const collegeProjects: Project[] = [
    {
      title: "Custom-Built AGV for Foxlink (Industrial Project)",
      description: "As part of an industrial collaboration with Foxlink Company, our team is currently developing a fully customized Automated Guided Vehicle (AGV) to meet their specific operational needs. The AGV is designed to handle a payload capacity of 30 kg and operate continuously for over 8 hours. It features a 1-meter sensing range for reliable navigation and obstacle detection. This project is being executed within a short 1.5-month timeline, demonstrating our team's ability to deliver fast, efficient, and tailored automation solutions for real-world industrial applications.",
      date: "on-going project",
      images: [
        "/CP0-AGV/AGV.jpg"
      ],
      note: "",
      projectLink: "",
      team: "Keerthi Kumar M | Nithin Ivan A | Vinoth Kumar A | Abinsasha P",
      mentor: "",
      technologies: ["SolidWorks", "ANSYS", "3D Printing", "PLA Material"]
    },
    {
      title: "5-Axis Robotic Arm – Prototype Development",
      description: "Developed a functional prototype of a 5-axis robotic arm for industrial applications, focusing on precision and repeatability. The project involved designing, fabricating, and programming the robotic arm to perform complex tasks with high accuracy.",
      date: "October 2024",
      images: [
        "/CP1-RA/RA-R1.png",
        "/CP1-RA/RA-A1.png"
      ],
      highlights: [
        "Designed and fabricated a 5-axis robotic arm prototype.",
        "Implemented control algorithms for precise movement.",
        "Integrated sensors for feedback and error correction.",
        "Demonstrated tasks like pick-and-place and object sorting.",
        "Optimized for industrial applications with high repeatability."
      ],
      note: "",
      projectLinks: [
        { 
          url: "https://www.linkedin.com/posts/keerthi-kumar-m-11904b27b_robotics-designengineering-mechanicaldesign-activity-7330962495047696413-UT_U?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQr_uUBqsQ8mg6I45GcjsS05NUW6Tx9lu8", 
          label: "Render model" 
        },
        { 
          url: "https://www.linkedin.com/posts/keerthi-kumar-m-11904b27b_robotics-mechanicaldesign-solidworks-activity-7331592934913441793-fw9C?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQr_uUBqsQ8mg6I45GcjsS05NUW6Tx9lu8", 
          label: "Assembly & Simulation" 
        },
        { 
          url: "https://www.linkedin.com/posts/keerthi-kumar-m-11904b27b_robotics-mechanicalengineering-automation-activity-7332725018163851264-eMHY?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQr_uUBqsQ8mg6I45GcjsS05NUW6Tx9lu8", 
          label: "Final Product" 
        }
      ],
      team: "Keerthi Kumar M (Project Lead) | Johanan S A | Prabod Arjun Kumar S | Maha Naveen Kumar M",
      mentor: "Dr. S. Iyah Raja, Head of Department, Mechanical Engineering",
      technologies: ["Robotics", "Control Systems", "Sensors", "Industrial Automation"]
    },
    {
      title: "IoT-Enhanced Smart Energy and Remote Management Solution",
      description: "As Team Lead, I spearheaded the development of a smart energy monitoring and remote control system tailored for industrial applications. Our team successfully implemented IoT technology, enabling real-time energy tracking, cloud-based analytics, and remote infrastructure management, promoting efficiency, predictive maintenance, and sustainability in industrial settings.",
      date: "April 2024",
      images: [
        "/CP2-EM/EM-A4.jpg",
        "/CP2-EM/EM-R1.png",
        "/CP2-EM/EM-A1.jpg",
        "/CP2-EM/EM-A2.jpg"
      ],
      highlights: [
        "Led project planning and team coordination for successful implementation",
        "Selected IoT-compatible sensors, ESP32, and RTC module for reliable electronics integration",
        "Designed and validated circuit layout with 3D modeling for precise component fit",
        "Procured quality electronic parts suitable for industrial applications",
        "Performed thermal and dimensional analysis to ensure heat management and proper casing fit",
        "Created CAD models for PCB mounting and durable acrylic/3D printed enclosure",
        "Optimized component placement for efficient layout and interference reduction",
        "Assembled and tested the complete system with integrated IoT control and mobile app"
      ],
      note: "You can check my LinkedIn profile for simulation and render models.",
      projectLinks: [
        { 
          url: "https://www.linkedin.com/posts/keerthi-kumar-m-11904b27b_mechanicaldesign-industrialautomation-iot-activity-7337718430399156224-F9s7?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQr_uUBqsQ8mg6I45GcjsS05NUW6Tx9lu8", 
          label: "Render Model" 
        },
        { 
          url: "https://www.linkedin.com/posts/kajenthira-s-202a682b9_im-excited-to-share-our-project-on-iot-enhanced-ugcPost-7322876178279649280-sw9u?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQr_uUBqsQ8mg6I45GcjsS05NUW6Tx9lu8", 
          label: "Final Product" 
        }
      ],
      team: "Keerthi Kumar M (Team Lead) | Kajenthira S | Naveen Raja T",
      mentor: "Ms. K.R. Indira, M.E.",
      technologies: ["IoT", "ESP32", "3D Printing", "Arduino"]
    },
    {
      title: "Fire-Fighting Robot with Dual Control",
      description: "As Team Lead, I successfully led the design and development of a fire-fighting robot with both autonomous and manual control modes. Our team created a sophisticated system capable of detecting and extinguishing flames, integrating sensor-based fire detection, precise water spraying mechanisms, and Bluetooth-enabled remote control, culminating in a fully functional prototype.",
      date: "March 2024",
      images: [
        "/CP3-FR/FR-A1.jpg",
        "/CP3-FR/FR-R1.png"
      ],
      highlights: [
        "Led system architecture design and team coordination for project completion",
        "Developed dual-mode control (autonomous + manual) using Arduino Nano",
        "Designed a custom circuit on preboard integrating all modules and sensors",
        "Integrated IR flame sensor for fire detection with fast response programming in C",
        "Used a 5V water pump with relay control and servo motor for directional spraying",
        "Enabled vehicle motion using 4 BO motors controlled via motor driver",
        "Powered the entire system with an 11.2V source and regulated using a buck converter",
        "Achieved Bluetooth-based control for remote manual operation"
      ],
      note: "You can check my LinkedIn profile for circuit designs, hardware setup, and video demonstrations.",
      projectLinks: [
        { 
          url: "https://www.linkedin.com/posts/keerthi-kumar-m-11904b27b_firefightingrobot-mechanicaldesign-solidworks-activity-7346828978738909184-tYXF?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQr_uUBqsQ8mg6I45GcjsS05NUW6Tx9lu8", 
          label: "Render Model" 
        },
        { 
          url: "https://www.linkedin.com/posts/keerthi-kumar-m-11904b27b_firefightingrobot-mechanicaldesign-embeddedsystems-activity-7347829232565161985-61V9?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQr_uUBqsQ8mg6I45GcjsS05NUW6Tx9lu8", 
          label: "Final Product" 
        }
      ],
      team: "Keerthi Kumar M (Team Lead) | Mithunbharathi M | Deepakkumar M",
      mentor: "Dr. Iyah Raja S., Head of the Department, Mechanical Engineering",
      technologies: ["Arduino Nano", "IR Flame Sensor", "Bluetooth", "Servo Motor", "Water Pump"]
    },
    {
      title: "CFD Analysis of Heat Transfer Enhancement",
      description: "This project investigates the thermal and flow characteristics of a two-feedback-channel fluidic oscillator using CFD simulations in ANSYS Fluent. The oscillator, designed with no moving parts, utilizes the Coandă effect and vortex dynamics to create self-sustaining oscillations that enhance heat transfer. CAD models were developed in SolidWorks and tested with transient simulations to analyze the performance under varying geometric parameters and boundary conditions using water as the working fluid.",
      date: "February 2024",
      images: [
        "/CP4-FO/FO-M2.png",
        "/CP4-FO/FO-M3.png",
        "/CP4-FO/FO-M1.png"
      ],
      highlights: [
        "Designed and optimized a no-moving-part fluidic oscillator based on the Coandă effect.",
        "Modeled various geometries using SolidWorks and evaluated them using CFD in ANSYS Fluent.",
        "Demonstrated heat transfer enhancement and efficient turbulent flow through oscillatory jets.",
        "Achieved effective oscillation stability and validated pressure, velocity, and thermal gradients.",
        "Applied SST k-ω turbulence model for precise simulation of complex flow dynamics."
      ],
      note: "",
      projectLink: "https://www.linkedin.com/posts/keerthi-kumar-m-11904b27b_cfd-analysis-of-heat-transfer-enhancement-activity-7353732245624377344-2sDw?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQr_uUBqsQ8mg6I45GcjsS05NUW6Tx9lu8",
      team: "Keerthi Kumar M",
      mentor: "Mr. B Prince Abraham",
      technologies: ["ANSYS Fluent", "SolidWorks", "CFD", "SST k-ω Turbulence Model"]
    },
    {
      title: "Design and Development of a Custom Macro Keypad",
      description: "MarcoPad is a compact, programmable macro keypad built using Raspberry Pi Pico, aimed at improving productivity for developers, editors, and gamers. It features 12 3D-printed tactile buttons, a rotary encoder, and a mode switch for multi-profile support. Housed in a SolidWorks-designed acrylic enclosure, the device uses MicroPython and USB HID to function as a customizable plug-and-play keyboard.",
      date: "February 2024",
      images: [
        "/CP6-MP/MP-R1.png",
        "/CP6-MP/MP-A2.jpg"
      ],
      highlights: [
        "Designed for professionals — ideal for coding, media editing, streaming, and multitasking",
        "12 fully programmable, 3D-printed tactile keys for custom shortcuts",
        "Rotary encoder for precise scroll/volume control and multi-profile switching via mode button",
        "Custom-designed PCB for optimized layout and compact integration",
        "Firmware developed in MicroPython with real-time USB HID emulation",
        "Enclosure modeled in SolidWorks and fabricated using laser-cut acrylic sheets"
      ],
      note: "",
      projectLink: "https://www.linkedin.com/posts/keerthi-kumar-m-11904b27b_pythonprogramming-micropython-embeddedsystems-activity-7342770899747598336-NGdk?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQr_uUBqsQ8mg6I45GcjsS05NUW6Tx9lu8",
      team: "Keerthi Kumar M",
      mentor: "Ms. K.R. Indira, M.E.",
      technologies: ["Raspberry Pi Pico", "MicroPython", "USB HID", "SolidWorks", "3D Printing"]
    },
  ]

  const personalProjects = [
    {
      title: "Ferrari 812 Superfast – OEM Rim Design & Structural Analysis",
      description:
        "A comprehensive design and engineering analysis project focused on the OEM rim of the Ferrari 812 Superfast. The project combined aesthetic design with mechanical performance evaluation, using industry-standard tools to assess the rim's strength, safety, and real-world reliability under high-performance conditions.",
      images: [
        "/PP1-CR/CR-R3.jpeg",
        "/PP1-CR/CR-R1.jpeg",
        "/PP1-CR/CR-R2.jpeg",
        "/PP1-CR/CR-AN3.jpeg"
      ],
      highlights: [
        "Designed an aerodynamic 20-inch rim preserving Ferrari's style using hand sketches.",
        "Created an accurate 3D model in SolidWorks focusing on form and function.",
        "Generated photorealistic renders with SolidWorks Visualize.",
        "Performed structural analysis using ANSYS to ensure durability.",
        "Results showed minimal deformation (0.178 mm) and low stress (35 MPa).",
        "Optimized design for improved handling, cornering, and stability.",
      ],
      note: "",
      projectLink: "https://www.linkedin.com/posts/keerthi-kumar-m-11904b27b_ferrari812superfast-automotiveengineering-activity-7334915072143593472-l1Rc?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQr_uUBqsQ8mg6I45GcjsS05NUW6Tx9lu8",
      team: "",
      mentor: "",
      technologies: ["SolidWorks", "ANSYS", "6061-T6 Aluminum Alloy", "Structural Analysis"],
    },
    {
      title: "Red 9-Inspired Conceptual CAD Model",
      description:
        "This project is a conceptual CAD model inspired by the iconic Red 9 Mauser C96 pistol from World War I. Starting with hand sketches based on the original Red 9 Mauser C96 pistol's dimensions, I developed a detailed 3D model in SolidWorks, focusing on the unique aesthetics and proportions of the Red 9. The final renders were created using SolidWorks Visualize, highlighting the design's form and surface details. This work helped me enhance my skills in concept design, 3D modeling, and visualization.",
      images: [
        "/PP2-RG/RD-R1.png",
        "/PP2-RG/RD-R2..png",
        "/PP2-RG/RD-R2.jpg"
      ],
      highlights: [
        "Conceptual design inspired by a historically significant firearm",
        "Hand-sketching combined with precise CAD modeling",
        "Accurate dimension referencing from original Red 9 pistol",
        "Detailed 3D modeling focusing on aesthetics and mechanical structure",
        "High-quality rendering using SolidWorks Visualize",
        "Enhanced skills in design translation and visualization",
      ],
      note: "",
      projectLink: "https://www.linkedin.com/posts/keerthi-kumar-m-11904b27b_caddesign-red9inspired-mechanicaldesign-activity-7333711190478438400-Tm_7?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQr_uUBqsQ8mg6I45GcjsS05NUW6Tx9lu8",
      technologies: ["SolidWorks", "Visualization", "Concept Design"],
    },
    {
      title: "HDT Chassis Design & Structural Analysis | 16 Tonne Payload",
      description: "During my in-plant training at Daimler India Commercial Vehicles, I gained firsthand exposure to the structural design and manufacturing practices behind both light and heavy-duty trucks. Motivated by this experience, I initiated an independent design project focused on developing a 16-tonne Heavy-Duty Truck chassis, drawing inspiration from BharatBenz architecture.",
      images: [
        "/PP3-HD/HD-R1.png",
        "/PP3-HD/HD-R4.png", 
        "/PP3-HD/HD-AN2.png"
      ],
      highlights: [
        "Independently designed a 16-tonne Heavy-Duty Truck chassis, inspired by BharatBenz architecture",
        "Modeled in SolidWorks with industry-standard dimensions and integrated 3 cross-members for rigidity",
        "Performed Static Structural Analysis in ANSYS, simulating braking, cornering, and gravity forces",
        "Used S690QL High-Strength Steel, commonly applied in commercial vehicle chassis",
        "Achieved a Factor of Safety of 2.17, with max stress (317 MPa) and deformation (8.77 mm) within elastic limits",
        "Project inspired by in-plant training at Daimler India, bridging academic knowledge with real-world engineering"
      ],
      note: "",
      projectLink: "https://www.linkedin.com/posts/keerthi-kumar-m-11904b27b_automotiveengineering-chassisdesign-mechanicalengineering-activity-7352192977559056385-BtaS?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQr_uUBqsQ8mg6I45GcjsS05NUW6Tx9lu8",
      team: "",
      mentor: "",
      technologies: ["Solar Energy", "Automation", "Sensors", "Renewable Energy", "Arduino", "Servo Control"],
    },
    {
      title: "Redesign and 3D Printing of Drone T-Joint",
      description: "This project involved the redesign and rapid prototyping of a structurally compromised T-joint in the landing gear of a 3 kg-payload agricultural drone, originally developed by a senior in our department. The existing joint had been temporarily fixed with adhesive, posing a high risk of mechanical failure. As the drone pilot and lead design engineer, I initiated a complete redesign of the component to restore and enhance its structural integrity.",
      images: [
        "/CP5-DR/DR-A1.jpg",
        "/CP5-DR/DR-A2.png",
        "/CP5-DR/DR-A3.jpg"
      ],
      highlights: [
        "Reverse-engineered the damaged T-joint using precision measurements with a vernier caliper",
        "Designed the replacement part in SolidWorks and conducted structural analysis using ANSYS",
        "Optimized the joint for load-bearing capacity, durability, and manufacturability",
        "Rapidly prototyped the component using PLA material through 3D printing",
        "Successfully integrated and tested the redesigned joint in live drone operation"
      ],
      note: "Detailed CAD designs, ANSYS simulation results, and project documentation are available in the project gallery. For additional technical details and engineering analysis, please visit my LinkedIn profile.",
      projectLink: "https://www.linkedin.com/posts/keerthi-kumar-m-11904b27b_mechanicalengineering-dronedesign-uav-activity-7351509687604834305-SXS6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQr_uUBqsQ8mg6I45GcjsS05NUW6Tx9lu8",
      team: "Keerthi Kumar M (Lead Design Engineer & Drone Pilot)",
      mentor: "",
      technologies: ["SolidWorks", "ANSYS", "3D Printing", "PLA Material"]
    },
    {
      title: "5-Speed Sequential Gearbox for Drift Car",
      description: "Currently developing a CAD model of a 5-speed sequential gearbox, specifically designed for rear-wheel-drive drift applications. Inspired by the Quaife In-Line 4-Speed Sequential, the design emphasizes close-ratio gearing, high torque handling, and a compact layout. The gear train and shift mechanism are modeled with precision, referencing standard drift gear ratios and multiple sequential transmission systems. This project serves as an in-depth exploration of motorsport-grade transmission design and mechanical engineering.",
      date: "on-going project",
      images: [
        "/PP5-SG/SG.jpg"
      ],
      note: "",
      projectLink: "",
      technologies: ["Mechanical Design", "Precision Machining", "Gear Systems", "Manufacturing", "CAD Design"],
    },
    {
      title: "Double Wishbone Suspension System Design",
      description: "Currently involved in the design of a double wishbone suspension system, commonly implemented in high-performance and motorsport vehicles. This setup offers superior handling, improved cornering stability, and consistent tire contact by precisely controlling camber and wheel movement throughout suspension travel. The design enables advanced tuning of ride dynamics, making it ideal for applications where performance, grip, and control are critical. This project serves as a study of race-inspired suspension geometry and kinematic behavior.",
      date: "on-going project",
      images: [
        "/PP6-DWB/DWB.jpg"
      ],
      note: "",
      projectLink: "",
      technologies: ["Electric Vehicles", "Battery Systems", "Motor Control", "Automotive Engineering", "Power Electronics"],
    },
  ]

  const skills = [
    { name: "SolidWorks", icon: "/Solidworks.png", size: "w-10px h-10px" }, // Larger size
    { name: "Catia", icon: "/Catia.png", size: "w-16 h-16" },
    { name: "Creo", icon: "/Creo.png", size: "w-16 h-16" },
    { name: "Fusion 360", icon: "/Fusion360.png", size: "w-16 h-16" },
    { name: "AutoCAD", icon: "/Autocad.png", size: "w-16 h-16" },
    { name: "ANSYS", icon: "/Ansys.png", size: "w-16 h-16" },
    { name: "MATLAB", icon: "/Matlab.png", size: "w-16 h-16" },
    { name: "Python", icon: "/python.png", size: "w-16 h-16" },
    { name: "Arduino IDE", icon: "/Arduino.png", size: "w-16 h-16" },
    { name: "C", icon: "/C.png", size: "w-16 h-16" },
  ]

  const experiences = [
    {
      title: "DICV-Daimler India Commercial Vehicles",
      company: "In-Plant Training",
      duration: "December 2024 - January 2025",
      description:
        "Gained hands-on exposure to the Heavy-Duty Truck (HDT) chassis line, analyzing production efficiency, assembly operations, and workflow. Observed key systems like powertrain, braking, and transmissions, as well as welding techniques and robotic painting. Learned lean manufacturing practices including Kaizen, 5S, and takt time.",
      location: "Chennai, India",
      skills: [
        "Powertrain & Transmission Systems",
        "Assembly Line & Production Analysis",
        "Lean Manufacturing",
        "Automation & Robotics",
        "Quality Control & Inspection"
      ],
      image: "/Exp-4.jpg", // Updated to use the image from the public folder
    },
    {
      title: "Mahindra Research Valley – R&D Center",
      company: "Mahindra XUV 3XO R&D Workshop",
      location: "Chennai, India",
      duration: "June 2024",
      description:
        "Attended an exclusive workshop organized by Motor Vikatan and Mahindra, exploring advanced R&D labs including Powertrain Testing, Design & Simulation, Fatigue Testing, and EV Development. Delivered a featured talk on NVH research, which was later published on YouTube, and engaged with Mahindra's R&D team to gain real-world insights into automotive innovation and validation.",
      skills: [
        "Powertrain Testing",
        "NVH Analysis",
        "Electric Vehicle Systems",
        "Fatigue Testing",
        "Design & Simulation",
        "Automotive R&D Exposure"
      ],
      image: "/Exp-3.jpg",
    },
    {
      title: "Eicher Motors Ltd.",
      company: "Automobile Engineering Workshops – Vahana V7 & Eicher Training Center",
      location: "Coimbatore, India",
      duration: "February 2024",
      description:
        "Participated in the National Level Technical Symposium 'Vahana V7' and workshops at the Eicher Training Center, including a focused session on CNG vehicle technology. Gained practical knowledge of CNG systems, braking, steering, instrument consoles, differentials, and Eicher's electronic architecture through hands-on exploration of cut-section models.",
      skills: [
        "CNG Vehicle Technology",
        "Braking & Steering Systems",
        "Instrument Console & Differentials",
        "Electronic Vehicle Architecture",
        "Practical Automotive Systems Observation"
      ],
      image: "/Exp-2.jpg",
    },
    {
      title: "National Engineering College",
      company: "Reverse Engineering Event Coordinator",
      location: "Kovilpatti, India",
      duration: "23rd March 2024",
      description:
        "Our team organized the Reverse Engineering event at National Engineering College's symposium, where we disassembled, cleaned, and reassembled XL100 and Max100 motorcycles. This hands-on work enhanced our technical skills and understanding of mechanical components. Coordinating the event also strengthened our teamwork and leadership while guiding participants through the process.",
      skills: [
        "Reverse Engineering",
        "Mechanical Assembly & Disassembly",
        "Hands-on Technical Skills",
        "Event Coordination",
        "Team Leadership"
      ],
      image: "/Exp-1.jpeg",
    },
  ]

  const certificates = {
    dassault: [
      {
        name: "SOLIDWORKS CAD Design Associate",
        issuer: "Dassault Systèmes",
        date: "2024",
        image: "/D-1.jpg", // Updated to use D-1.jpg from public folder
        description: "Earned certification as a SOLIDWORKS CAD Design Associate, demonstrating proficiency in 3D modeling, assemblies, part modifications, and engineering drawings. Gained hands-on experience with parametric design, design intent, and industry-standard CAD practices.",
        skills: [
          "3D Modeling & Assembly",
          "Parametric Design",
          "Engineering Documentation",
          "Design Intent Implementation"
        ]
      },
      {
        name: "SOLIDWORKS Additive Manufacturing Associate",
        issuer: "Dassault Systèmes",
        date: "2024",
        image: "/D-2.jpg",
        description: "Officially certified by Dassault Systèmes upon successfully completing the SOLIDWORKS Additive Manufacturing Associate online academic exam through SOLIDWORKS Corp.",
        skills: [
          "Additive Manufacturing",
          "3D Printing Design",
          "Manufacturing Optimization",
          "Design for Manufacturing"
        ]
      },
      {
        name: "SOLIDWORKS Sustainability Associate",
        issuer: "Dassault Systèmes",
        date: "2024",
        image: "/D-3.jpg",
        description: "Completed the SOLIDWORKS Sustainability Associate Certification by Dassault Systèmes, gaining knowledge in sustainable design and lifecycle assessment.",
        skills: [
          "Sustainable Design",
          "Lifecycle Assessment",
          "Environmental Impact Analysis",
          "Green Engineering"
        ]
      },
    ],
    nptel: [
      {
        name: "Product Design and Manufacturing",
        issuer: "NPTEL - IIT Kanpur",
        date: "Jan-Apr 2024",
        image: "/N-1.jpg",
        description: "Elite certification with 73% score (Assignments: 24.69/25, Exam: 48/75). Among 2952 certified candidates. Enhanced knowledge in product development, manufacturing processes, and design methodologies.",
        skills: [
          "Product Development",
          "Manufacturing Processes",
          "Design Strategy",
          "Industrial Engineering",
          "CAD/CAM"
        ]
      },
      {
        name: "Social Innovation in Industry 4.0",
        issuer: "NPTEL - IIT Kanpur",
        date: "Jan-Apr 2024",
        image: "/N-2.jpg",
        description: "Elite Silver certification in emerging technologies and innovation ecosystems. Focused on leveraging technology for societal impact and industrial transformation.",
        skills: [
          "Industry 4.0",
          "Innovation Management",
          "Technology Integration",
          "Sustainable Development",
          "Social Impact"
        ]
      },
      {
        name: "Automation in Production Systems and Management",
        issuer: "NPTEL - IIT Kharagpur",
        date: "Jul-Oct 2024",
        image: "/N-3.jpg",
        description: "Elite certification with 61% score (Assignments: 22.81/25, Exam: 38.25/75). Among 317 certified candidates. Focused on automation technologies and production management.",
        skills: [
          "Industrial Automation",
          "Production Planning",
          "System Integration",
          "Process Optimization",
          "Management Systems"
        ]
      },
      {
        name: "Advanced Materials and Processes",
        issuer: "NPTEL - IIT Kharagpur",
        date: "Jul-Oct 2024",
        image: "/N-4.jpg",
        description: "Elite certification with 54% score (Assignments: 21.25/25, Exam: 33/75). Among 139 certified candidates. Studied advanced materials and processing techniques.",
        skills: [
          "Material Science",
          "Process Engineering",
          "Material Testing",
          "Manufacturing Technology",
          "Material Analysis"
        ]
      },
      {
        name: "Soft Skills Development",
        issuer: "NPTEL",
        date: "2023",
        image: "/N-5.jpg",
        description: "Foundation course in professional communication and workplace behavior. Enhanced interpersonal skills and business etiquette.",
        skills: [
          "Communication",
          "Professional Etiquette",
          "Team Collaboration",
          "Workplace Ethics"
        ]
      },
    ],
    events: [
      {
        name: "Second Prize - Sustainable Fuel Resources Research",
        issuer: "Anna University Regional Campus, Tirunelveli",
        date: "March 2024",
        image: "/E-1.jpg",
        description: "Awarded Second Prize at KALAM'24 Science Fair for the paper 'Sustainable Fuel Resources for Diverse Transportation Modes'. Presented research on sustainable transportation solutions to over 50 participants, demonstrating technical expertise and public speaking skills.",
        skills: [
          "Sustainable Technology",
          "Research Presentation",
          "Technical Writing",
          "Innovation in Transportation"
        ]
      },
      {
        name: "Third Prize - Paper Presentation on BMW Telelever Suspension",
        issuer: "Hindustan College of Engineering and Technology",
        date: "February 2024",
        image: "/E-2.jpg",
        description: "Secured Third Place for paper presentation on 'BMW Telelever Suspension System' at Vahana V7 national symposium. Participated in hands-on workshops including CNG vehicle technology and reverse engineering of automotive components.",
        skills: [
          "Automotive Systems",
          "Technical Analysis",
          "Mechanical Design",
          "Vehicle Technology"
        ]
      },
      {
        name: "Second Prize - Paper Presentation on Dodge Challenger",
        issuer: "Hi-Tech Fest 2K23",
        date: "2023",
        image: "/E-3.jpg",
        description: "Awarded 2nd Prize for Paper Presentation on the Dodge Challenger, recognized as the fastest production car ever made, demonstrating deep understanding of automotive engineering and performance vehicles.",
        skills: [
          "Performance Engineering",
          "Automotive Design",
          "Technical Documentation",
          "Engineering Analysis"
        ]
      },
      {
        name: "GD&T Certification",
        issuer: "Technical Symposium",
        date: "2024",
        image: "/E-4.png",
        description: "Certified Participant in Geometric Dimensioning and Tolerancing Webinar, gaining insights into precision design and manufacturing principles.",
        skills: [
          "Precision Engineering",
          "Manufacturing Standards",
          "Technical Drawing",
          "Quality Control"
        ]
      },
    ],
  }

  const blogPosts = [
    {
      id: "the-dream",
      title: "The Dream",
      excerpt:
        "How my passion for automobiles turned into a career path - from early fascination with cars to pursuing mechanical engineering across diverse industries.",
      images: [
        "/b1.jpg",
      ],
      date: "July 25, 2025",
      tags: ["Automotive", "Engineering", "Career"],
      readTime: "2 min read",
      content: `# The Dream
How My Passion for Automobiles Turned Into a Career Path

## A Spark from Unexpected Inspiration

My fascination with automobiles began early in life—drawn to the design, power, and engineering behind cars and bikes. What truly deepened this passion was an early exposure to automotive simulation games, which introduced me to car performance, mechanical components, and the variety across global car brands.

## Curiosity Turned Into Passion

One car that captured my attention was the Ford Mustang GT, a symbol of American muscle and heritage. Researching it led me to Carroll Shelby, the legendary racer and designer. From there, I immersed myself in the technical and historical sides of automotive engineering.

## The Engineering Dream

I've always been inspired by famous car designers and the advanced technology involved in building high-performance machines. Motorsports like Hypercars, Rally, Dakar, and Le Mans push the limits of design and demand extreme levels of engineering. But my curiosity didn't stop there.

I was also fascinated by the engineering behind aeronautics, marine vessels like ships and yachts, and large-scale industrial plants. The complexity of these systems—ranging from thermal systems to structural design—showed me how broad and impactful mechanical engineering truly is. This inspired me to pursue Mechanical Engineering, a field that connects innovation with real-world performance across industries.

## Learning Through Real-World Connections

For me, engineering is not limited to books or classrooms. I constantly relate core concepts to real-world applications, which helps me understand deeper and think critically. Whether it's thermodynamics or design mechanics, I always explore how they apply to machines and systems I admire.

## Subjects That Fuel Me

Design & Graphics | Thermal Engineering | Strength of Materials | Material Science | Manufacturing Technology

## The Road Ahead

What began as curiosity has grown into a focused career path. My goal is not just to understand machines, but to innovate and design them. The dream that once started with admiration is now backed by engineering skill and purpose.

---

*"It's not just about what you write on paper—it's about how deeply you understand what's behind it."*`,
      author: "Keerthi Kumar M",
      authorImage: "/profile.jpg"
    }
  ]

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      const sections = ["hero", "education", "projects", "skills", "experience", "certificates", "blogs"] // 'skills' is still here for scroll tracking
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  function BlogCard({ post }: { post: any }) {
    return (
      <Link 
        href={`/blog/${post.id}`} 
        className="block"
        prefetch={true}
      >
        <div className="border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-card hover:scale-[1.01] cursor-pointer">
          {/* Blog Header */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Blog Image */}
              <div className="flex-shrink-0">
                <img
                  src={post.images[0]}
                  alt={post.title}
                  className="w-full md:w-48 h-32 md:h-28 object-cover rounded-lg no-select"
                  loading="lazy"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
              
              {/* Blog Content */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-3 line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Blog Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                  <span>{post.readTime}</span>
                  <div className="flex gap-2">
                    {post.tags.map((tag: string, tagIndex: number) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Read More Button */}
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="text-sm transition-all duration-200">
                    Read More →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      {mounted && (
        <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
          <div className="nav-container flex flex-col space-y-1 rounded-xl p-2 shadow-md border bg-background/95 backdrop-blur-sm min-w-[90px]">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`nav-button text-xs font-medium transition-all duration-200 px-2 py-1.5 rounded-lg hover:bg-muted hover:text-foreground ${
                  activeSection === section.id 
                    ? 'active bg-muted text-foreground' 
                    : 'text-muted-foreground'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-start">
        {/* Banner Carousel - relative for positioning profile photo */}
        <div className="w-full relative">
          <HeroBannerCarousel images={bannerImages} />
          {/* Profile Photo - Centered at bottom center of banner, matching red cross reference */}
          <div
            className="absolute left-1/2 bottom-0 z-20"
            style={{ transform: 'translate(-250%, 50%)' }}
          >
            <Image
              src="/profile.jpg"
              alt="Profile Photo"
              width={200}
              height={200}
              className="rounded-full shadow-lg bg-white border-4 border-white"
              priority
              sizes="200px"
            />
          </div>
        </div>

        {/* Profile Info and About Me - left and right columns */}
        <div className="max-w-6xl mx-auto relative mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Profile Photo and Info */}
          <div className="flex flex-col items-center md:items-start">
            {/* Add gap below profile photo */}
            <div className="mb-14"></div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-foreground">Keerthi Kumar M</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">Mechanical Engineer</p>
            <div className="flex flex-col space-y-3 mb-6 items-center md:items-start">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-5 h-5 mr-2" />
                Chennai, Tamilnadu
              </div>
              <a
                href="mailto:keerthikumar8608@email.com"
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                keerthikumar8608@email.com
              </a>
            </div>
            <div className="flex justify-center md:justify-start space-x-6 mb-8">
              <a
                href="https://www.linkedin.com/in/keerthi-kumar-m-11904b27b/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/keerthikumar8608"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/Keerthikumar8608"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://behance.net/Keerthikumar22"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                aria-label="Behance"
              >
                <Behance className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Right Column: About Me - moved and styled for green box */}
          <div className="flex flex-col items-center justify-center w-full h-full" style={{ transform: 'translateX(-50px)' }}>
            <div className="w-full md:w-[600px] lg:w-[650px]">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground text-center">About Me</h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-justify mb-6">
                Mechanical Engineering student passionate about automotive design, motorsport innovation, and
                future-focused engineering. Certified SolidWorks Associate with hands-on experience at Daimler India
                (DICV). Experienced in projects spanning product development, research, mechatronics, automation, and
                energy. Skilled in leadership, communication, and public speaking—turning bold ideas into impactful,
                user-centered designs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a href="/placeholder.pdf" download="Alex_Johnson_Resume.pdf">
                    Download Resume
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/placeholder.pdf" download="Alex_Johnson_Portfolio.pdf">
                    Download Portfolio
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Education Section */}
      <section id="education" className="py-20 px-6 bg-background transition-colors duration-500">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">Education</h2>
          
          {/* Education Timeline */}
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {/* Education Item 1 - School */}
            <div className="flex flex-col items-center relative">
              {/* Education Card */}
              <div className="bg-card text-card-foreground rounded-lg shadow-md border border-border p-6 w-64 text-center hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold mb-2">B.E. Mechanical Engineering</h3>
                <p className="text-sm text-muted-foreground mb-2">National Engineering College</p>
                <p className="text-sm font-medium">2022-2026</p>
              </div>
            </div>

            {/* Connecting Line 1 */}
            <div className="hidden md:block w-16 h-0.5 bg-border"></div>
            <div className="md:hidden w-0.5 h-8 bg-border"></div>

            {/* Education Item 2 - College */}
            <div className="flex flex-col items-center relative">
              {/* Education Card */}
              <div className="bg-card text-card-foreground rounded-lg shadow-md border border-border p-6 w-64 text-center hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold mb-2">Higher secondary</h3>
                <p className="text-sm text-muted-foreground mb-2">Kalaimagal Vidhya Mandhir Matric Hr Sec School</p>
                <p className="text-sm font-medium">2020-2022</p>
              </div>
            </div>

            {/* Connecting Line 2 */}
            <div className="hidden md:block w-16 h-0.5 bg-border"></div>
            <div className="md:hidden w-0.5 h-8 bg-border"></div>

            {/* Education Item 3 - University */}
            <div className="flex flex-col items-center relative">
              {/* Education Card */}
              <div className="bg-card text-card-foreground rounded-lg shadow-md border border-border p-6 w-64 text-center hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold mb-2">SSLC</h3>
                <p className="text-sm text-muted-foreground mb-2">Kalaimagal Vidhya Mandhir Matric Hr Sec School</p>
                <p className="text-sm font-medium">2019-2020</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-muted/20 transition-colors duration-500">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">Projects</h2>
          {/* College Projects */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-foreground">College Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collegeProjects.map((project, index) => (
                <div
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-lg overflow-hidden bg-card border border-border shadow-sm relative"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Status Badge */}
                  <div className="absolute top-2 right-2 z-10 bg-background text-foreground text-xs font-semibold px-2 py-1 rounded pointer-events-none select-none border border-border">
                    {project.date?.toLowerCase().includes('on-going') ? 'Ongoing' : 'Completed'}
                  </div>
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg no-select"
                    loading="lazy"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-card-foreground">{project.title}</h3>
                  </div>
                  <span
                    className="absolute bottom-2 right-4 text-xs font-semibold text-muted-foreground bg-background/80 px-2 py-1 rounded shadow border border-border pointer-events-none select-none"
                  >
                    Show More
                  </span>
                </div>
              ))}
            </div>
            {selectedProject && (
              <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
              />
            )}
          </div>
          {/* Personal Projects */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-foreground">Personal Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalProjects.map((project, index) => (
                <div
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-lg overflow-hidden bg-card border border-border shadow-sm relative"
                  onClick={() => setSelectedPersonalProject(project)}
                >
                  {/* Status Badge */}
                  <div className="absolute top-2 right-2 z-10 bg-background text-foreground text-xs font-semibold px-2 py-1 rounded pointer-events-none select-none border border-border">
                    {project.date && project.date.toLowerCase().includes('on-going') ? 'Ongoing' : 'Completed'}
                  </div>
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg no-select"
                    loading="lazy"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-card-foreground">{project.title}</h3>
                  </div>
                  <span
                    className="absolute bottom-2 right-4 text-xs font-semibold text-muted-foreground bg-background/80 px-2 py-1 rounded shadow border border-border pointer-events-none select-none"
                  >
                    Show More
                  </span>
                </div>
              ))}
            </div>
            {selectedPersonalProject && (
              <ProjectModal
                project={selectedPersonalProject}
                isOpen={!!selectedPersonalProject}
                onClose={() => setSelectedPersonalProject(null)}
              />
            )}
          </div>
        </div>
      </section>

      {/* New Skills Section - Responsive Layout */}
      <section id="skills" className="py-20 px-6 bg-background text-foreground transition-colors duration-500">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-left mb-16">Software I Use</h2>
          <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="flex-shrink-0 w-24 flex flex-col items-center justify-center text-center">
                <Image
                  src={skill.icon || "/placeholder.svg"}
                  alt={skill.name}
                  width={skill.name === "Catia" ? 100 : 64} // Make Catia logo 100x100
                  height={skill.name === "Catia" ? 100 : 64} // Make Catia logo 100x100
                  className="mb-2 object-contain"
                  loading="lazy"
                />
                <p className={`text-sm font-medium text-foreground ${skill.name === "Catia" ? "mt-2 flex items-center justify-center h-full" : ""}`}>{skill.name}</p> {/* Adjust Catia font alignment */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section - Timeline Style (Reverted) */}
      <section id="experience" className="py-20 px-6 bg-muted/20 transition-colors duration-500">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">Experience</h2>
          {/* Timeline Container */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300 dark:bg-gray-700 transition-colors duration-500"></div>{" "}
            {/* Added transition */}
            {/* Timeline Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  {/* Content Card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border border-border relative">
                          <CardHeader className="p-0">
                            <Image
                              src={exp.image || "/placeholder.svg"}
                              alt={exp.company}
                              width={400}
                              height={200}
                              className="w-full h-auto object-contain rounded-t-lg" // Updated to maintain image dimensions
                              loading="lazy"
                            />
                          </CardHeader>
                          <CardContent className="p-4">
                            <CardTitle className={`mb-2 text-foreground ${exp.title === 'In-Plant Training' ? 'text-2xl font-bold' : 'text-lg'}`}>{exp.title}</CardTitle>
                            <CardDescription className="font-semibold text-blue-600 mb-2">
                              {exp.company}
                            </CardDescription>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4 mr-2" />
                              {exp.duration}
                            </div>
                          </CardContent>
                        {/* Show More text at bottom right of card cover */}
                        <span className="absolute bottom-2 right-4 text-xs font-semibold text-muted-foreground bg-background/80 px-2 py-1 rounded shadow border border-border pointer-events-none select-none">
                          Show More
                        </span>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-foreground">{exp.title}</DialogTitle>
                          <DialogDescription className="text-muted-foreground">
                            {exp.company} • {exp.duration}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Image
                            src={exp.image || "/placeholder.svg"}
                            alt={exp.company}
                            width={600}
                            height={300}
                            className="w-full h-64 object-cover rounded-lg"
                            loading="lazy"
                          />
                          <p className="text-foreground leading-relaxed">{exp.description}</p>
                          {exp.skills && (
                            <div className="mt-4">
                              <h4 className="text-lg font-semibold mb-2 text-foreground">Skills</h4>
                              <div className="flex flex-wrap gap-3">
                                {exp.skills.map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="px-4 py-2 rounded-full bg-white text-black font-semibold text-base whitespace-nowrap border border-black"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Timeline Point */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center w-6 h-6 bg-black rounded-full border-4 border-background shadow-lg transition-colors duration-500">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>

                  {/* Empty Space for Alternating Layout */}
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Certificates Section */}
      <section id="certificates" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">Certificates</h2>
          <Tabs defaultValue="dassault" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="dassault">Dassault Systems</TabsTrigger>
              <TabsTrigger value="nptel">NPTEL</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger> {/* Renamed tab */}
            </TabsList>

            <TabsContent value="dassault">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.dassault.map((cert, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border border-border relative">
                        <CardHeader className="p-0">
                          <Image
                            src={cert.image || "/placeholder.svg"}
                            alt={cert.name}
                            width={300}
                            height={200}
                            className="w-full h-48 object-contain rounded-t-lg"
                            style={{ objectPosition: "center" }}
                            loading="lazy"
                          />
                        </CardHeader>
                        <CardContent className="p-4">
                          <CardTitle className="text-lg mb-2 text-foreground">{cert.name}</CardTitle>
                          <CardDescription className="mb-2 text-muted-foreground">{cert.issuer}</CardDescription>
                          <Badge variant="outline">{cert.date}</Badge>
                        </CardContent>
                        {/* Show More text at bottom right of card cover */}
                        <span className="absolute bottom-2 right-4 text-xs font-semibold text-muted-foreground bg-background/80 px-2 py-1 rounded shadow border border-border pointer-events-none select-none">
                          Show More
                        </span>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">{cert.name}</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                          Issued by {cert.issuer} in {cert.date}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Image
                          src={cert.image || "/placeholder.svg"}
                          alt={cert.name}
                          width={600}
                          height={400}
                          className="w-full rounded-lg border border-border"
                          loading="lazy"
                        />
                {cert.description && (
                  <p className="text-base text-muted-foreground">
                    {cert.description}
                  </p>
                )}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-sm font-semibold mb-2 text-foreground">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-white text-black font-medium text-xs whitespace-nowrap border border-black"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nptel">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.nptel.map((cert, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border border-border relative">
                        <CardHeader className="p-0">
                          <Image
                            src={cert.image || "/placeholder.svg"}
                            alt={cert.name}
                            width={300}
                            height={200}
                            className="w-full h-48 object-contain rounded-t-lg"
                            style={{ objectPosition: "center" }}
                            loading="lazy"
                          />
                        </CardHeader>
                        <CardContent className="p-4">
                          <CardTitle className="text-lg mb-2 text-foreground">{cert.name}</CardTitle>
                          <CardDescription className="mb-2 text-muted-foreground">{cert.issuer}</CardDescription>
                          <Badge variant="outline">{cert.date}</Badge>
                        </CardContent>
                        {/* Show More text at bottom right of card cover */}
                        <span className="absolute bottom-2 right-4 text-xs font-semibold text-muted-foreground bg-background/80 px-2 py-1 rounded shadow border border-border pointer-events-none select-none">
                          Show More
                        </span>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">{cert.name}</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                          Issued by {cert.issuer} in {cert.date}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Image
                          src={cert.image || "/placeholder.svg"}
                          alt={cert.name}
                          width={600}
                          height={400}
                          className="w-full rounded-lg border border-border"
                          loading="lazy"
                        />
                        {cert.description && (
                          <p className="text-base text-muted-foreground">
                            {cert.description}
                          </p>
                        )}
                        {cert.skills && cert.skills.length > 0 && (
                          <div className="mt-2">
                            <h4 className="text-sm font-semibold mb-2 text-foreground">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {cert.skills.map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 rounded-full bg-white text-black font-medium text-xs whitespace-nowrap border border-black"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.events.map((cert, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border border-border relative">
                        <CardHeader className="p-0">
                          <Image
                            src={cert.image || "/placeholder.svg"}
                            alt={cert.name}
                            width={300}
                            height={200}
                            className="w-full h-48 object-contain rounded-t-lg"
                            style={{ objectPosition: "center" }}
                            loading="lazy"
                          />
                        </CardHeader>
                        <CardContent className="p-4">
                          <CardTitle className="text-lg mb-2 text-foreground">{cert.name}</CardTitle>
                          <CardDescription className="mb-2 text-muted-foreground">{cert.issuer}</CardDescription>
                          <Badge variant="outline">{cert.date}</Badge>
                        </CardContent>
                        {/* Show More text at bottom right of card cover */}
                        <span className="absolute bottom-2 right-4 text-xs font-semibold text-muted-foreground bg-background/80 px-2 py-1 rounded shadow border border-border pointer-events-none select-none">
                          Show More
                        </span>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">{cert.name}</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                          Issued by {cert.issuer} in {cert.date}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Image
                          src={cert.image || "/placeholder.svg"}
                          alt={cert.name}
                          width={600}
                          height={400}
                          className="w-full rounded-lg border border-border"
                          loading="lazy"
                        />
                        {cert.description && (
                          <p className="text-base text-muted-foreground">
                            {cert.description}
                          </p>
                        )}
                        {cert.skills && cert.skills.length > 0 && (
                          <div className="mt-2">
                            <h4 className="text-sm font-semibold mb-2 text-foreground">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {cert.skills.map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 rounded-full bg-white text-black font-medium text-xs whitespace-nowrap border border-black"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      {/* Blogs Section - Now with cards that navigate to dedicated pages */}
      <section id="blogs" className="py-20 px-6 bg-muted/20 transition-colors duration-500">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">Blogs</h2>
          <div className="space-y-6">
            {blogPosts.map((post, index) => (
              <BlogCard key={index} post={post} />
            ))}
          </div>
        </div>
      </section>
      {/* Footer for Main Page */}
      <footer className="py-8 px-6 bg-gray-900 text-white transition-colors duration-500">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="w-full flex justify-center items-center relative mb-2">
            <p className="w-full text-center text-gray-400">© 2025 Keerthi kumar / Page last edited on: 25th July 2025</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
