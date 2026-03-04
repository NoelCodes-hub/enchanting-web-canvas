import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, FileText, Download, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Template {
  id: number;
  title: string;
  category: string;
  summary: string;
  content: string;
}

const templates: Template[] = [
  {
    id: 1, category: 'Accommodation', title: 'Reasonable Accommodation Policy',
    summary: 'A comprehensive policy outlining the process for requesting and providing reasonable accommodations.',
    content: `REASONABLE ACCOMMODATION POLICY

1. PURPOSE
This policy establishes a clear, consistent process for employees to request and receive reasonable accommodations in compliance with disability rights legislation.

2. SCOPE
This policy applies to all employees, job applicants, and contractors.

3. DEFINITIONS
- Reasonable Accommodation: Any modification to the work environment or the way work is performed that enables a qualified individual with a disability to perform essential job functions.
- Interactive Process: A collaborative dialogue between the employer and employee to identify effective accommodations.

4. PROCEDURE
4.1 An employee may submit a request verbally or in writing to their supervisor or HR.
4.2 HR will initiate the interactive process within 5 business days.
4.3 Medical documentation may be requested to support the accommodation need.
4.4 A decision will be communicated within 15 business days.
4.5 Accommodations will be reviewed annually or upon request.

5. CONFIDENTIALITY
All medical information will be kept confidential and stored separately from personnel files.

6. NON-RETALIATION
No employee shall face retaliation for requesting an accommodation.`,
  },
  {
    id: 2, category: 'Recruitment', title: 'Inclusive Hiring Policy',
    summary: 'Guidelines to ensure fair and accessible recruitment practices for candidates with disabilities.',
    content: `INCLUSIVE HIRING POLICY

1. PURPOSE
To ensure all recruitment processes are accessible and provide equal opportunity to candidates with disabilities.

2. JOB POSTINGS
- Include an equal opportunity statement.
- List only essential functions.
- Offer alternative application formats.
- Include accommodation contact info.

3. INTERVIEW PROCESS
- Ask all candidates the same core questions.
- Provide interview questions in advance upon request.
- Ensure interview locations are accessible.
- Offer virtual interview options.

4. ASSESSMENT
- Evaluate candidates on ability to perform essential functions with or without accommodation.
- Do not ask about disability status before a conditional offer.

5. ONBOARDING
- Ask new hires about accommodation needs during onboarding.
- Provide materials in accessible formats.`,
  },
  {
    id: 3, category: 'Workplace', title: 'Accessible Workplace Standards',
    summary: 'Standards for maintaining physical and digital accessibility across all workplace environments.',
    content: `ACCESSIBLE WORKPLACE STANDARDS

1. PHYSICAL ENVIRONMENT
- All entrances must have ramp access and automatic doors.
- Hallways must be at least 1.2m wide for wheelchair passage.
- Accessible restrooms on every floor.
- Adjustable-height desks available upon request.
- Signage in braille and large print.

2. DIGITAL ENVIRONMENT
- All internal tools must meet WCAG 2.1 AA standards.
- Documents shared in accessible formats (tagged PDFs).
- Video content must have captions.
- Screen reader compatibility required for all software.

3. COMMUNICATION
- Provide meeting materials 48 hours in advance.
- Offer sign language interpretation for company-wide events.
- Use clear, plain language in all official communications.

4. EMERGENCY PROCEDURES
- Personalized emergency evacuation plans for employees with disabilities.
- Visual and auditory alarm systems.
- Designated assistance personnel trained annually.`,
  },
  {
    id: 4, category: 'Training', title: 'Disability Awareness Training Policy',
    summary: 'Policy framework for mandatory disability awareness and sensitivity training programs.',
    content: `DISABILITY AWARENESS TRAINING POLICY

1. PURPOSE
To foster a culture of understanding, respect, and inclusion for employees with disabilities.

2. REQUIREMENTS
- All new employees must complete disability awareness training within 30 days.
- Annual refresher training for all staff.
- Managers must complete advanced training on accommodation processes.

3. TRAINING CONTENT
- Understanding different types of disabilities.
- Appropriate language and communication etiquette.
- Legal obligations and employee rights.
- How to respond to accommodation requests.
- Unconscious bias related to disability.

4. DELIVERY
- Online modules available 24/7.
- In-person workshops quarterly.
- All training materials in accessible formats.

5. TRACKING
- HR maintains training completion records.
- Non-completion may affect performance reviews.`,
  },
  {
    id: 5, category: 'Accommodation', title: 'Remote Work Accommodation Policy',
    summary: 'Guidelines for providing accommodations to employees working remotely.',
    content: `REMOTE WORK ACCOMMODATION POLICY

1. PURPOSE
To ensure employees with disabilities receive appropriate accommodations when working remotely.

2. ELIGIBLE ACCOMMODATIONS
- Ergonomic equipment shipped to home.
- Assistive technology software licenses.
- Flexible scheduling for medical appointments.
- Virtual sign language interpretation.
- Screen reader compatible collaboration tools.

3. PROCESS
- Submit request via HR portal or email.
- Virtual consultation within 5 business days.
- Equipment shipped within 10 business days.
- IT support for setup and ongoing issues.

4. COST
- All approved accommodation costs covered by employer.
- Annual budget review per employee.

5. EQUIPMENT RETURN
- Equipment must be returned upon separation from employment.`,
  },
  {
    id: 6, category: 'Workplace', title: 'Anti-Discrimination and Disability Rights Policy',
    summary: 'A policy ensuring protection against discrimination based on disability status.',
    content: `ANTI-DISCRIMINATION AND DISABILITY RIGHTS POLICY

1. COMMITMENT
The organization is committed to providing equal opportunities and preventing discrimination against persons with disabilities in all aspects of employment.

2. PROHIBITED CONDUCT
- Refusing to hire based on disability.
- Harassment related to disability.
- Denying reasonable accommodations without undue hardship justification.
- Retaliating against accommodation requests.

3. REPORTING
- Employees may report discrimination to HR, a manager, or anonymously.
- All reports investigated within 10 business days.
- Confidentiality maintained throughout.

4. CONSEQUENCES
- Violations may result in disciplinary action up to termination.

5. REVIEW
- Policy reviewed annually by legal and HR teams.`,
  },
];

const categories = ['All', 'Accommodation', 'Recruitment', 'Workplace', 'Training'];

const PolicyTemplates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filtered = activeCategory === 'All' ? templates : templates.filter(t => t.category === activeCategory);

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({ title: 'Copied to clipboard!' });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadTemplate = (template: Template) => {
    const blob = new Blob([template.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.title.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-bg py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors">
            <ArrowLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <div className="flex items-center gap-3">
            <FileText className="w-7 h-7 text-primary-foreground" />
            <div>
              <h1 className="text-xl sm:text-2xl font-display font-bold text-primary-foreground">Policy Templates</h1>
              <p className="text-sm text-primary-foreground/70">Ready-to-use inclusive workplace policy templates</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'gradient-bg text-primary-foreground shadow-glow' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Templates */}
        <div className="space-y-4">
          {filtered.map((tmpl, i) => (
            <motion.div key={tmpl.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium gradient-accent-bg text-accent-foreground mb-2">{tmpl.category}</span>
                    <h3 className="text-lg font-semibold text-foreground">{tmpl.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{tmpl.summary}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(tmpl.content, tmpl.id)}>
                      {copiedId === tmpl.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => downloadTemplate(tmpl)}>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setExpandedId(expandedId === tmpl.id ? null : tmpl.id)}>
                      {expandedId === tmpl.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedId === tmpl.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-border">
                    <pre className="p-5 text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed bg-muted/30">{tmpl.content}</pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicyTemplates;
