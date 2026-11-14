import { useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import Layout from "@/components/Layout";

const projects = [
  {
    title: "Solar Energy Monitoring System",
    category: "Embedded systems · Energy",
    status: "Built and tested",
    summary: "ESP32-based telemetry for an off-grid solar installation, monitoring solar generation, battery conditions, inverter load and panel temperature.",
    problem: "Off-grid installations often lack an independent way to observe energy flow and battery conditions without relying on reporting from the inverter or charge controller.",
    contribution: "Designed the ESP32 sensing and telemetry firmware, integrated dual INA226 monitors, an AC current clamp and a DS18B20 temperature probe, then published readings to an MQTT broker over TLS.",
    result: "A documented prototype completed around 25 hours of continuous operation and recorded more than 100 data points. It is an observational monitoring tool, not a certified meter or battery-management system.",
    stack: "ESP32 · INA226 · MQTT/TLS · DS18B20",
    repo: "https://github.com/AdejireA/solar-energy-monitoring-system",
  },
  {
    title: "Battery Anomaly Detection at the Edge",
    category: "Machine learning · Edge computing",
    status: "Research project",
    summary: "A lightweight, unsupervised approach to flagging unusual lithium-ion battery discharge behaviour on Raspberry Pi-class hardware.",
    problem: "Battery anomaly detection is difficult when labelled fault data is scarce and deployment hardware has limited compute.",
    contribution: "Designed a causal-residual scoring method, trained per-cell Isolation Forest models on NASA Ames and CALCE ageing datasets, and validated inference on a Raspberry Pi 3B+.",
    result: "Across four validation/test cells, the frozen models reported clean false-positive rates of 1.9–4.1%. Predictions were replicated on the Pi at roughly 64 ms median per-cycle latency. The system has not been field-deployed.",
    stack: "Python · Isolation Forest · NASA Ames / CALCE · Raspberry Pi",
    repo: "https://github.com/AdejireA/battery-anomaly-edge",
  },
  {
    title: "ROS 2 Agricultural Field Scout",
    category: "Robotics · Simulation",
    status: "Final-year project",
    summary: "Simulation-based evaluation of a dual-mode agricultural scouting robot with autonomous navigation and manual override.",
    problem: "A field robot needs predictable handover between autonomous navigation and a human operator, plus a reliable stop response when commands disappear.",
    contribution: "Built a ROS 2 mode-arbitration node between Nav2 velocity output and keyboard teleoperation, with a dedicated mode topic and a dead-man timeout. Evaluated it in a Gazebo crop-row environment.",
    result: "Across 60 simulation trials, the node passed all 80 mode-switch tests, measured 39.2 ms median dead-man response time, and reached 97.8% navigation success (352/360 waypoints). The evaluation used a fixed map-to-odom transform; it did not implement SLAM or live LiDAR obstacle avoidance.",
    stack: "ROS 2 Jazzy · Nav2 · Gazebo Harmonic · Python",
    repo: "https://github.com/AdejireA/ros2-farm-scout-FYP",
  },
  {
    title: "Line Following Robot",
    category: "Embedded robotics",
    status: "Built",
    summary: "A small autonomous robot that follows a predefined path using an IR sensor array and differential drive.",
    problem: "Path following requires timely sensor readings and stable correction of motor output as the robot moves off the line.",
    contribution: "Built the robot, integrated the IR sensors and motor driver, and developed firmware for sensor reading, PID-based correction and differential motor control.",
    result: "A working prototype for exploring closed-loop control, sensor calibration and embedded debugging.",
    stack: "IR sensor array · PID control · Differential drive · Firmware",
  },
  {
    title: "Smart Home Automation System",
    category: "Embedded systems",
    status: "Built",
    summary: "A microcontroller-based prototype for monitoring environmental conditions and automating appliance control.",
    problem: "Manual appliance control provides limited environmental awareness and automation.",
    contribution: "Designed the system architecture, selected and integrated sensors, and implemented the firmware and control logic.",
    result: "A functional prototype combining sensor readings, wireless communication and appliance switching.",
    stack: "Microcontroller firmware · Environmental sensors · Wireless communication · Embedded C",
  },
  {
    title: "Unmanned Ground Vehicle",
    category: "Robotics platform",
    status: "Prototype",
    summary: "A modular small-scale ground robot designed as a starting point for future autonomous systems work.",
    problem: "Autonomy experiments benefit from a platform that separates mobility, sensing and processing so components can be changed independently.",
    contribution: "Designed a modular chassis, implemented embedded motor control and incorporated mounting points for sensors.",
    result: "A sensor-ready platform intended for later navigation and autonomy development.",
    stack: "Embedded motor control · Chassis design · Sensor integration",
  },
];

const Projects = () => {
  const [openProject, setOpenProject] = useState<string | null>("ROS 2 Agricultural Field Scout");

  return (
    <Layout>
      <section className="page-shell py-14 md:py-20">
        <p className="eyebrow mb-4">Selected work</p>
        <h1 className="max-w-3xl text-4xl leading-tight md:text-5xl">Projects built to answer a question.</h1>
        <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
          A mix of embedded systems, robotics simulation and applied machine learning. I try to document not only what worked, but also the limits of each result.
        </p>

        <div className="mt-12 border-t border-border">
          {projects.map((project, index) => {
            const isOpen = openProject === project.title;
            return (
              <article key={project.title} className="border-b border-border">
                <button
                  className="grid w-full gap-3 py-6 text-left sm:grid-cols-[44px_minmax(0,1fr)_auto] sm:items-start sm:gap-5"
                  aria-expanded={isOpen}
                  onClick={() => setOpenProject(isOpen ? null : project.title)}
                >
                  <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="eyebrow block text-[10px]">{project.category}</span>
                    <span className="mt-1 block text-xl font-medium transition-colors group-hover:text-primary">{project.title}</span>
                    <span className="mt-2 block max-w-3xl text-sm leading-6 text-muted-foreground">{project.summary}</span>
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground sm:pt-1">{isOpen ? "− CLOSE" : "+ DETAILS"}</span>
                </button>

                {isOpen && (
                  <div className="grid gap-6 pb-7 pl-0 sm:grid-cols-[44px_minmax(0,1fr)] sm:gap-5">
                    <span />
                    <div className="grid gap-5 md:grid-cols-3">
                      <div>
                        <h2 className="eyebrow mb-2">Problem</h2>
                        <p className="text-sm leading-6 text-muted-foreground">{project.problem}</p>
                      </div>
                      <div>
                        <h2 className="eyebrow mb-2">My work</h2>
                        <p className="text-sm leading-6 text-muted-foreground">{project.contribution}</p>
                      </div>
                      <div>
                        <h2 className="eyebrow mb-2">Result & limits</h2>
                        <p className="text-sm leading-6 text-muted-foreground">{project.result}</p>
                      </div>
                      <div className="md:col-span-3 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                        <p className="font-mono text-xs leading-6 text-muted-foreground">{project.stack}</p>
                        {project.repo && (
                          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                            <Github size={15} /> Source code <ArrowUpRight size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
