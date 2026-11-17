import gazeboFarmEnvironment from "@/assets/ros2-gazebo-topdown-environment.png";
import batteryScoreDrift from "@/assets/battery-score-drift.png";
import batteryCleanFpr from "@/assets/battery-clean-fpr.png";
import solarInstalledSystem from "@/assets/solar-installed-system.jpg";
import solarControllerBoard from "@/assets/solar-controller-board.jpg";

export type Project = { slug: string; title: string; caseStudyTitle?: string; field: string; year: string; summary: string; challenge: string; contribution: string; outcome: string; resultsSource?: string; limitations: string; stack: string[]; repo: string; image?: string; imageAlt?: string; navigationImage?: string; navigationAlt?: string; secondaryImage?: string; secondaryAlt?: string };

export const projects: Project[] = [
  {
    slug: "agricultural-field-scout", title: "ROS 2 Agricultural Robot: Control and Fail-Safe Evaluation", field: "Robotics / Autonomous Systems", year: "2026",
    caseStudyTitle: "Experimental Evaluation of Traded Control and Command-Loss Fail-Safe Behaviour in a ROS 2 Agricultural Robot",
    summary: "A simulation-based study of autonomous navigation, manual control handovers, and command-loss safety in a ROS 2 agricultural robot, evaluated through repeatable experiments in Gazebo.",
    challenge: "A field robot must navigate crop rows while allowing an operator to intervene without competing motion commands. It must also stop when the autonomous command stream is lost.",
    contribution: "Built the ROS 2 command-arbitration node and repeatable experiment harness. Integrated Nav2, AMCL localisation, scripted manual interventions, and command-loss testing in Gazebo Harmonic.",
    outcome: "The final evaluation contains 60 simulation trials across reference, manual-intervention and command-loss conditions. The final trial summary records a mean command-loss-to-physical-stop time of 0.553 seconds across the 20 command-loss trials.",
    resultsSource: "https://github.com/AdejireA/ros2-farm-scout-FYP/blob/phase-b-redesign/results/final/trial_summary.csv",
    limitations: "Simulation only; not a field-deployed or safety-certified robot. Earlier development charts in analysis_output are not the final A/B/C evaluation.",
    stack: ["ROS 2 Jazzy", "Nav2", "AMCL", "Gazebo Harmonic", "Python"],
    repo: "https://github.com/AdejireA/ros2-farm-scout-FYP/tree/phase-b-redesign",
    // Unlabelled Gazebo screenshot (Figure 3.4) extracted from Adejire_Final_FYP_Report.pdf,
    // embedded image object X196 (624 x 672).
    image: gazeboFarmEnvironment,
    imageAlt: "Top-down Gazebo simulation view of the agricultural field showing five crop rows, two rock obstacles, and the robot at the lower-left headland",
    navigationImage: "https://raw.githubusercontent.com/AdejireA/ros2-farm-scout-FYP/phase-b-redesign/results/final/figures/Figure_3_6_autonomous_scouting_route.png",
    navigationAlt: "Waypoint diagram of the autonomous scouting route through the simulated agricultural field",
    secondaryImage: "https://raw.githubusercontent.com/AdejireA/ros2-farm-scout-FYP/phase-b-redesign/results/final/figures/Figure_3_10_intervention_locations.png",
    secondaryAlt: "Manual intervention locations in the simulated field"
  },
  {
    slug: "battery-anomaly-edge", title: "Battery Anomaly Detection at the Edge", field: "Machine Learning / Edge Intelligence", year: "2026",
    summary: "An unsupervised battery-health anomaly pipeline designed for constrained hardware and evaluated across ageing datasets.",
    challenge: "Battery measurements drift as cells age, making static anomaly thresholds unreliable, especially without labelled real-world faults.",
    contribution: "Reworked an initial absolute-feature Isolation Forest approach into a history-relative scoring pipeline, evaluated on NASA and CALCE datasets and replayed on Raspberry Pi 3B+ hardware.",
    outcome: "The project documents the original false-positive problem, the redesigned representation, test-set results, and physical-device inference measurements.",
    limitations: "Synthetic anomaly injection is not equivalent to detecting confirmed field faults; results do not establish deployment readiness.",
    stack: ["Python", "Isolation Forest", "NASA Ames", "CALCE", "Raspberry Pi"],
    repo: "https://github.com/AdejireA/battery-anomaly-edge",
    image: batteryScoreDrift,
    imageAlt: "Comparison of absolute and history-relative anomaly score drift",
    secondaryImage: batteryCleanFpr,
    secondaryAlt: "Clean false-positive rate across history windows"
  },
  {
    slug: "solar-monitoring", title: "Solar Energy Monitoring System", field: "Embedded Systems / Energy", year: "2026",
    summary: "An ESP32 telemetry system for observing solar generation, battery conditions, load current, and temperature.",
    challenge: "Off-grid installations need independent visibility into energy flow and operating conditions without relying entirely on inverter reporting.",
    contribution: "Integrated INA226 current and voltage monitoring, SCT-013 AC sensing, DS18B20 temperature readings, and MQTT telemetry on an ESP32.",
    outcome: "The repository documents an installed prototype, its sensing circuitry, and a continuous-operation test of approximately 25 hours.",
    limitations: "Observational prototype, not a certified energy meter or battery-management system. The prototype's TLS configuration should not be represented as production-grade security.",
    stack: ["ESP32", "INA226", "DS18B20", "MQTT", "Embedded C"],
    repo: "https://github.com/AdejireA/solar-energy-monitoring-system",
    image: solarInstalledSystem,
    imageAlt: "Installed solar energy monitoring hardware",
    secondaryImage: solarControllerBoard,
    secondaryAlt: "Solar monitoring controller board"
  }
];
