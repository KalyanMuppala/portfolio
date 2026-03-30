import React from 'react';

const Resume: React.FC = () => {
  return (
    <div className="bg-white min-h-screen p-8 md:p-16 font-serif text-black selection:bg-zinc-200">
      <div className="max-w-[850px] mx-auto shadow-2xl p-12 bg-white border border-zinc-100">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Devi Jagannadh Kalyan Muppala</h1>
          <div className="text-sm text-zinc-600 flex flex-wrap justify-center gap-x-4 gap-y-1">
            <span>United States</span>
            <span>|</span>
            <span>203-382-3736</span>
            <span>|</span>
            <a href="mailto:mdjkalyan@gmail.com" className="hover:underline">mdjkalyan@gmail.com</a>
            <span>|</span>
            <a href="https://www.linkedin.com/in/muppala-kalyan" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mb-8">
          <h2 className="text-lg font-bold border-b-2 border-zinc-800 mb-3 uppercase tracking-wider">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-zinc-800">
            Senior Cloud Engineer driving multi-cloud solutions on AWS and Azure. Leads design, deployment, and secure operation of production platforms using
            Kubernetes, Terraform, and DevOps automation. Delivered end-to-end migration of mission-critical workloads, achieving 30% cost reduction and enhanced
            compliance for regulated environments. Seeking to leverage cloud architecture expertise to accelerate digital transformation and operational excellence.
          </p>
        </section>

        {/* Core Competencies */}
        <section className="mb-8">
          <h2 className="text-lg font-bold border-b-2 border-zinc-800 mb-3 uppercase tracking-wider">Core Competencies</h2>
          <ul className="text-sm space-y-1 list-disc pl-5 text-zinc-800">
            <li><strong>Cloud Platforms:</strong> AWS, Microsoft Azure, Multi-Cloud Architecture</li>
            <li><strong>AWS:</strong> EC2, EKS, ECS, Lambda, S3, EBS, RDS, DynamoDB, VPC, IAM, CloudWatch, Organizations, Transit Gateway</li>
            <li><strong>Azure:</strong> Virtual Machines, VNets, Azure AD, Entra ID, Azure Storage, Azure SQL, AKS, App Services, Azure Functions, Azure Monitor, Log Analytics, Sentinel</li>
            <li><strong>Infrastructure as Code:</strong> Terraform, AWS CloudFormation, ARM Templates, Bicep</li>
            <li><strong>DevOps & Automation:</strong> CI/CD, GitHub Actions, Jenkins, Azure DevOps, Bash, Python, PowerShell, AWS CLI, Azure CLI</li>
            <li><strong>Containers & Platforms:</strong> Kubernetes, EKS, AKS, Docker, Helm</li>
            <li><strong>Security & Compliance:</strong> IAM, RBAC, Key Vault, Secrets Management, Encryption, CIS, SOC 2, NIST, HIPAA-aligned controls</li>
            <li><strong>Observability & Reliability:</strong> Monitoring, Logging, Alerting, Incident Response, RCA, SLOs, DR/BCP</li>
            <li><strong>Networking:</strong> VPC/VNet Design, Subnets, Routing, NAT, VPN, Load Balancers, DNS, Firewalls</li>
            <li><strong>FinOps:</strong> Cost Optimization, Budgeting, Tagging, Rightsizing, Reserved Instances</li>
          </ul>
        </section>

        {/* Professional Experience */}
        <section className="mb-8">
          <h2 className="text-lg font-bold border-b-2 border-zinc-800 mb-4 uppercase tracking-wider">Professional Experience</h2>
          
          {/* MilliporeSigma */}
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="font-bold text-base">MilliporeSigma (Merck Group) | Cloud Engineer – AWS Platform & Kubernetes</h3>
              <span className="text-sm font-semibold">May 2024 - Present</span>
            </div>
            <ul className="text-sm space-y-1 list-disc pl-5 text-zinc-800">
              <li>Owned and operated production AWS environments for customer-facing and internal platforms, applying NIST and HIPAA-aligned controls and rightsizing practices, which maintained continuous compliance and reduced cost overruns</li>
              <li>Architected, deployed, and managed AWS EKS clusters, improving update reliability and reducing cluster downtime by 30% through enhanced lifecycle management, autoscaling, and secure networking.</li>
              <li>Designed and maintained infrastructure as code with Terraform and CloudFormation to standardize AWS environments, reducing provisioning time by 40% and minimizing configuration errors across deployments.</li>
              <li>Implemented monitoring, logging, and alerting with CloudWatch using observability best practices, resulting in 99.9% system uptime and reducing incident response times by 40%.</li>
              <li>Lead incident troubleshooting, root cause analysis, and postmortems, implementing preventive controls to improve platform reliability.</li>
              <li>Enhanced cloud security by implementing IAM least-privilege policies, managing secrets, enforcing encryption, and isolating networks, which improved overall protection and reduced risks of unauthorized access.</li>
              <li>Optimized cloud costs by rightsizing EC2/ECS instances, applying tagging strategies, conducting capacity planning, and increasing spend visibility, which lowered monthly AWS spend and improved budgeting accuracy</li>
              <li>Partnered with application, DevOps, and security teams to design and deploy secure, scalable AWS solutions that improved system reliability and met compliance standards.</li>
            </ul>
          </div>

          {/* University of New Haven */}
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="font-bold text-base">University of New Haven | Graduate Research Assistant – Azure Cloud & Platform Automation</h3>
              <span className="text-sm font-semibold">Apr 2023 - Apr 2024</span>
            </div>
            <ul className="text-sm space-y-1 list-disc pl-5 text-zinc-800">
              <li>Designed and supported Azure infrastructure for analytics and research workloads in a regulated academic environment using Azure Resource Manager templates and Azure Key Vault, which provided secure, reliable access to research data</li>
              <li>Implemented Azure IaaS and PaaS services-including Virtual Machines, VNets, Azure Storage, Azure AD, and Azure Monitor-enabling faster provisioning of research environments and improving overall system availability</li>
              <li>Assisted with cloud automation and Infrastructure as Code, improving deployment consistency and operational reliability.</li>
              <li>Supported backup, disaster recovery, and performance optimization for Azure workloads by configuring Azure Backup policies and monitoring performance metrics, resulting in faster recovery times and improved system performance</li>
              <li>Collaborated with cross-functional teams to document cloud architectures, operational runbooks, and troubleshooting procedures.</li>
            </ul>
          </div>

          {/* Intellipaat */}
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="font-bold text-base">Intellipaat Software Solutions | Cloud Infrastructure Engineer – AWS & DevOps</h3>
              <span className="text-sm font-semibold">Jun 2021 - Jan 2023</span>
            </div>
            <ul className="text-sm space-y-1 list-disc pl-5 text-zinc-800">
              <li>Supported and maintained AWS cloud infrastructure-including EC2, VPC, IAM, S3, RDS, and networking components-ensuring continuous availability and compliance with security standards</li>
              <li>Assisted in Terraform-based provisioning and environment automation across development and production accounts, accelerating deployment cycles and reducing configuration errors</li>
              <li>Supported containerized workloads on Kubernetes, deploying applications and troubleshooting issues, which improved service reliability and reduced recovery time</li>
              <li>Developed Python and Bash automation scripts to reduce manual operational tasks and improve efficiency.</li>
              <li>Performed Linux system administration, set up CloudWatch monitoring alerts, and provided incident response for distributed cloud systems, decreasing average incident resolution time by 25%</li>
              <li>Collaborated with senior engineers on cloud migrations and CI/CD pipelines using Docker and AWS CloudWatch, leading to faster deployments and fewer system errors.</li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-lg font-bold border-b-2 border-zinc-800 mb-3 uppercase tracking-wider">Education</h2>
          <div className="text-sm space-y-1 text-zinc-800">
            <p className="font-bold">University of New Haven | Master of Science, Business Analytics & Technologies</p>
            <p className="font-bold">Lovely Professional University | Bachelor of Technology, Computer Science Engineering</p>
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-lg font-bold border-b-2 border-zinc-800 mb-3 uppercase tracking-wider">Certifications</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-zinc-800">
            <p>• AWS Certified Solutions Architect Professional</p>
            <p>• Microsoft Certified: Azure Solutions Architect Expert</p>
            <p>• HashiCorp Terraform Associate</p>
            <p>• Certified Kubernetes Administrator</p>
          </div>
        </section>
      </div>
      
      {/* Print Button (Optional but helpful) */}
      <div className="fixed bottom-8 right-8 print:hidden">
        <button 
          onClick={() => window.print()}
          className="bg-zinc-900 text-white px-6 py-3 rounded-full shadow-lg hover:bg-zinc-800 transition-all flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print / Save as PDF
        </button>
      </div>
    </div>
  );
};

export default Resume;
