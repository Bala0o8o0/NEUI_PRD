
import React, { useState, useEffect, useRef } from 'react';
import AudioInput from './components/AudioInput';
import MarkdownRenderer from './components/MarkdownRenderer';
import { generateOutline, generateDocument, verifyDocument } from './services/geminiService';
import { soundManager } from './services/soundUtils';
import { GenerationStatus, WorkflowStep, DocType } from './types';
import { 
  SparklesIcon, EditIcon, EyeIcon, DownloadIcon, 
  BrainIcon, SearchIcon, ChevronRightIcon, MenuIcon,
  GithubIcon, LinkedinIcon, MailIcon, CopyIcon, CheckIcon
} from './components/Icons';

// --- Icons ---
const ShieldCheckIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
);

const XIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
);

// --- New UI Components ---

/**
 * Retro Space Invader Loader
 */
const RetroInvaderLoader = () => {
  return (
    <div className="relative w-[44px] h-[32px] flex-shrink-0 flex items-center justify-center flex-shrink-0">
      <div className="pixel-invader"></div>
    </div>
  );
};

/**
 * Typewriter Text Effect
 */
const TypewriterText = ({ text, speed = 15, className = "" }: { text: string, speed?: number, className?: string }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    setDisplayText(''); // Reset on text change
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  
  return <p className={className}>{displayText}<span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-pulse align-middle"></span></p>;
};

/**
 * Cyber Processing Overlay with Data Stream and Sounds
 */
const CyberProcessingOverlay = ({ message }: { message: string }) => {
    const [hexLines, setHexLines] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Start/Stop Sound Loop
    useEffect(() => {
        soundManager.startProcessingLoop();
        return () => {
            soundManager.stopProcessingLoop();
        };
    }, []);

    // Generate random hex data
    useEffect(() => {
        const interval = setInterval(() => {
            const hex = Array(30).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();
            setHexLines(prev => [...prev.slice(-15), `> ${hex}`]);
            if (containerRef.current) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
        }, 80);
        return () => clearInterval(interval);
    }, []);

    // Progress bar 0-100%
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 99) return 99;
                // Variable speed increment for realism
                const increment = Math.random() * 2 + 0.5;
                return prev + increment;
            });
        }, 150);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/95 z-[100] overflow-hidden font-mono">
             {/* Background Streaming Hex */}
             <div className="absolute inset-0 opacity-20 pointer-events-none p-4 text-xs text-green-900 overflow-hidden break-all leading-3">
                 {Array(50).fill(0).map((_,i) => (
                     <div key={i}>{Array(100).fill(0).map(()=>Math.random() > 0.5 ? '1' : '0').join('')}</div>
                 ))}
             </div>

             <div className="relative z-10 w-full max-w-lg p-6 border-2 border-green-500 bg-black shadow-[0_0_50px_rgba(0,255,65,0.2)] flex flex-col items-center gap-5">
                 <div className="flex items-center justify-center self-center gap-5 mb-6 pb-4 border-b border-green-900/50 w-full">
                     <div className="flex-shrink-0 flex-shrink-0">
                        <RetroInvaderLoader />
                     </div>
                     <div className="flex flex-col justify-center">
                         <h3 className="text-xl font-bold text-green-400 animate-pulse tracking-widest">{message}</h3>
                         <p className="text-[10px] text-green-600 font-mono mt-1 tracking-wider">ENCRYPTION_LEVEL_512 // NEURAL_UPLINK</p>
                     </div>
                 </div>

                 {/* Console Output */}
                 <div ref={containerRef} className="h-32 w-full bg-green-900/10 border border-green-800 p-2 mb-4 overflow-hidden text-xs text-green-400 font-mono">
                     {hexLines.map((line, i) => (
                         <div key={i}>{line}</div>
                     ))}
                 </div>

                 {/* Progress Bar */}
                 <div className="w-full h-4 border border-green-700 p-0.5">
                     <div 
                        className="h-full bg-green-500 transition-all duration-200"
                        style={{ width: `${progress}%` }}
                     ></div>
                 </div>
                 <div className="w-full flex justify-between mt-1 text-xs text-green-500">
                     <span>[ PROCESSING_BATCH ]</span>
                     <span>{Math.floor(progress)}%</span>
                 </div>
             </div>
        </div>
    );
};

/**
 * Button with "Decrypt/Hashing" text effect
 */
const HackerButton = ({ 
  children, 
  onClick, 
  disabled, 
  className, 
  title 
}: { 
  children?: React.ReactNode, 
  onClick?: () => void, 
  disabled?: boolean, 
  className?: string,
  title?: string
}) => {
  const [displayText, setDisplayText] = useState<string | React.ReactNode>(children);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  const intervalRef = useRef<number | null>(null);

  const startScramble = () => {
    if (typeof children !== 'string') return;
    
    let iteration = 0;
    if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
    }
    
    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        children
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return children[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iteration >= children.length) {
        if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
        }
      }
      
      iteration += 1 / 3;
    }, 30);
  };

  const handleMouseEnter = () => {
    if (!disabled) {
        soundManager.playClick();
        startScramble();
    }
  };
  
  const handleClick = () => {
      if (!disabled && onClick) {
          soundManager.playClick();
          onClick();
      }
  }

  // Also scramble on mount/updates briefly
  useEffect(() => {
    startScramble();
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [children]);

  return (
    <button 
      onClick={handleClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      className={className}
      title={title}
    >
      {displayText || children}
    </button>
  );
};

/**
 * NEW: Premium Cyber Button Component
 */
const CyberButton = ({ 
    children, 
    onClick, 
    disabled, 
    className = "",
    variant = "primary",
    icon: Icon
}: { 
    children?: React.ReactNode, 
    onClick?: () => void, 
    disabled?: boolean, 
    className?: string,
    variant?: "primary" | "secondary" | "highlight",
    icon?: React.ElementType
}) => {
    return (
        <button
            onClick={() => {
                if (!disabled && onClick) {
                    soundManager.playClick();
                    onClick();
                }
            }}
            disabled={disabled}
            className={`cyber-btn ${variant === 'secondary' ? 'secondary' : ''} ${variant === 'highlight' ? 'highlight' : ''} ${className}`}
        >
            {Icon && <Icon className="w-5 h-5" />}
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            <span className="scan-line"></span>
        </button>
    );
};


// --- Boot Sequence Component ---
const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
    const [lines, setLines] = useState<string[]>([]);
    const bootLines = [
        "Initializing NEUI_KERNEL...",
        "Loading Modules: [AI_ARCHITECT, GEMINI_PRO, CRYPTO_V2]",
        "Checking Memory Integrity... OK",
        "Establishing Neural Uplink... CONNECTED",
        "Decrypting User Interface...",
        "System Ready."
    ];

    useEffect(() => {
        let delay = 0;
        bootLines.forEach((line, index) => {
            delay += Math.random() * 300 + 200;
            setTimeout(() => {
                soundManager.playClick();
                setLines(prev => [...prev, line]);
                if (index === bootLines.length - 1) {
                    setTimeout(onComplete, 800);
                }
            }, delay);
        });
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] bg-black text-green-400 font-mono flex flex-col items-center justify-center">
            <div className="mb-8 scale-150">
                <RetroInvaderLoader />
            </div>
            <div className="w-full max-w-md p-4 border border-green-700 bg-green-900/10">
                {lines.map((line, i) => (
                    <div key={i}>{`> ${line}`}</div>
                ))}
                <div className="text-sm animate-pulse">_</div>
            </div>
        </div>
    );
};

// --- Page Components ---

const App: React.FC = () => {
  // Data State
  const [requirementsInput, setRequirementsInput] = useState('');
  const [outlineContent, setOutlineContent] = useState('');
  const [docContent, setDocContent] = useState('');
  const [docType, setDocType] = useState<DocType>('PRD');
  const [verificationReport, setVerificationReport] = useState('');
  const [verificationInput, setVerificationInput] = useState('');

  // UI State
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [step, setStep] = useState<WorkflowStep>(WorkflowStep.INPUT);
  const [viewMode, setViewMode] = useState<'preview' | 'edit'>('preview');
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // Boot State
  const [hasBooted, setHasBooted] = useState(false);

  // Persistence
  useEffect(() => {
    const savedReqs = localStorage.getItem('gemini_prd_reqs');
    if (savedReqs) setRequirementsInput(savedReqs);
  }, []);

  useEffect(() => {
    localStorage.setItem('gemini_prd_reqs', requirementsInput);
  }, [requirementsInput]);

  // Audio Processing Effect - PLAY ONCE ON START (Success Handled separately)
  useEffect(() => {
      if (status === GenerationStatus.COMPLETE) {
          soundManager.playSuccess();
      }
  }, [status]);

  const handleTranscription = (text: string) => {
    setRequirementsInput(prev => (prev ? `${prev} ${text}` : text));
  };

  const handleGenerateOutline = async () => {
    if (!requirementsInput.trim()) return;

    setStatus(GenerationStatus.GENERATING);
    try {
      const generatedOutline = await generateOutline(requirementsInput, docType);
      setOutlineContent(generatedOutline);
      setStep(WorkflowStep.OUTLINE);
      setStatus(GenerationStatus.COMPLETE);
    } catch (error) {
      console.error("Outline generation failed", error);
      soundManager.playError();
      setStatus(GenerationStatus.ERROR);
    }
  };

  const handleGenerateDocument = async () => {
    if (!outlineContent.trim()) return;

    setStatus(GenerationStatus.GENERATING);
    try {
      const generatedDoc = await generateDocument(requirementsInput, outlineContent, docType);
      setDocContent(generatedDoc);
      setStep(WorkflowStep.RESULT);
      setStatus(GenerationStatus.COMPLETE);
      setViewMode('preview');
    } catch (error) {
      console.error("Document generation failed", error);
      soundManager.playError();
      setStatus(GenerationStatus.ERROR);
    }
  };

  const handleVerify = async (contentToVerify: string) => {
    if (!contentToVerify.trim()) return;
    
    setStatus(GenerationStatus.VERIFYING);
    try {
        const report = await verifyDocument(contentToVerify, docType);
        setVerificationReport(report);
        setIsVerificationModalOpen(true);
        setStatus(GenerationStatus.COMPLETE);
    } catch (error) {
        console.error("Verification failed", error);
        soundManager.playError();
        setStatus(GenerationStatus.ERROR);
    }
  };

  const handleDownload = () => {
    soundManager.playClick();
    const blob = new Blob([docContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    let filename = 'document.md';
    if (docType === 'PRD') filename = 'product_requirements.md';
    if (docType === 'CLI') filename = 'gemini.md';
    if (docType === 'PROMPT') filename = 'system_prompt.md';
    if (docType === 'ALL') filename = 'master_dossier.md';
    
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    soundManager.playSuccess();
  };

  const handleCopy = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(docContent).then(() => {
        setIsCopied(true);
        soundManager.playSuccess();
        setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleReset = () => {
    setStep(WorkflowStep.INPUT);
    setOutlineContent('');
    setDocContent('');
    setVerificationReport('');
    setIsVerificationModalOpen(false);
    setStatus(GenerationStatus.IDLE);
  };

  const handleNavVerification = () => {
      setStep(WorkflowStep.VERIFY_INPUT);
      setVerificationInput('');
      setStatus(GenerationStatus.IDLE);
  };

  // Helper to determine loading text based on context
  const getLoadingMessage = () => {
      if (status === GenerationStatus.VERIFYING) return "AUDITING_SYSTEMS";
      if (step === WorkflowStep.INPUT) return "ANALYZING_REQUIREMENTS";
      if (step === WorkflowStep.OUTLINE) return "COMPILING_BLUEPRINT";
      if (step === WorkflowStep.VERIFY_INPUT) return "RUNNING_INTEGRITY_CHECKS";
      return "PROCESSING_DATA";
  };

  // --- Views ---

  const renderHeader = () => (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-2 cursor-pointer group" onClick={handleReset}>
        <div className="w-8 h-8 bg-transparent border border-green-500 flex items-center justify-center">
          <BrainIcon className="w-5 h-5 text-green-500" />
        </div>
        <span className="text-xl font-heading tracking-widest text-green-500 glitch-slow">NEUI_PRD_V1.0<span className="animate-pulse">_</span></span>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm font-bold font-mono tracking-widest">
        <HackerButton onClick={handleReset} className={`uppercase hover:text-green-400 transition-colors ${step === WorkflowStep.INPUT || step === WorkflowStep.OUTLINE || step === WorkflowStep.RESULT ? 'text-green-500 underline underline-offset-4 decoration-2' : 'text-green-700'}`}>[ Home ]</HackerButton>
        <HackerButton onClick={handleNavVerification} className={`uppercase hover:text-green-400 transition-colors ${step === WorkflowStep.VERIFY_INPUT ? 'text-green-500 underline underline-offset-4 decoration-2' : 'text-green-700'}`}>[ Verify ]</HackerButton>
        <HackerButton onClick={() => {soundManager.playClick(); setStep(WorkflowStep.ABOUT);}} className={`uppercase hover:text-green-400 transition-colors ${step === WorkflowStep.ABOUT ? 'text-green-500 underline underline-offset-4 decoration-2' : 'text-green-700'}`}>[ About ]</HackerButton>
      </nav>

      <div className="flex items-center gap-4">
        <button className="md:hidden text-green-500">
          <MenuIcon />
        </button>
        <div className="hidden md:flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-white transition-colors" onClick={() => soundManager.playClick()}>
                <GithubIcon className="w-6 h-6 stroke-[1.5]" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-white transition-colors" onClick={() => soundManager.playClick()}>
                <LinkedinIcon className="w-6 h-6 stroke-[1.5]" />
            </a>
            <a href="mailto:contact@example.com" className="text-green-500 hover:text-white transition-colors" onClick={() => soundManager.playClick()}>
                <MailIcon className="w-6 h-6 stroke-[1.5]" />
            </a>
        </div>
      </div>
    </header>
  );

  const renderHero = () => (
    <div className="relative min-h-screen flex flex-col items-center pt-24 md:pt-32 px-4 overflow-hidden">
      
      {/* Headings */}
      <div className="text-center mb-8 z-10 fade-in w-full max-w-4xl relative">
        <div className="inline-block mb-6 px-4 py-2 border border-green-800 bg-black/50 rounded-full">
          <div className="flex items-center gap-3">
             <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
             <span className="text-xs font-bold text-green-500 uppercase tracking-widest">
                SYSTEM ONLINE
             </span>
          </div>
        </div>
        <h1 className="text-5xl md:text-8xl font-heading font-bold text-green-400 mb-6 tracking-tighter">
          ARCHITECT<span className="text-green-200">_YOUR_</span>VISION
        </h1>
        <p className="text-lg md:text-xl text-green-600 font-mono tracking-wide max-w-2xl mx-auto uppercase">
          {'>'} Initialize Product Requirements Protocol<br/>
          {'>'} Generate CLI Specifications, Prompts & More...
        </p>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-3xl relative z-20 slide-up" style={{animationDelay: '0.1s'}}>
         {/* Mode Toggle */}
         <div className="flex gap-0 mb-2 font-mono text-sm border-b-0 w-fit">
            {(['PRD', 'CLI', 'PROMPT', 'ALL'] as DocType[]).map((type) => (
                <button 
                  key={type}
                  onClick={() => { soundManager.playClick(); setDocType(type); }}
                  className={`px-6 py-3 border border-b-0 transition-colors uppercase text-base ${docType === type ? 'bg-green-500 text-black border-green-500 font-black tracking-wide' : 'text-green-600 border-green-800 hover:text-green-500 hover:bg-green-900/20 font-black'}`}
                >
                  {type}.MOD
                </button>
            ))}
         </div>

         {/* Search Bar - Solid Boxy Style */}
         <div className="relative group">
            <div className="relative flex items-center bg-black/90 border-2 border-green-700 p-4 transition-all hover:border-green-400 hover:bg-green-900/10">
               <div className="pl-2 pr-4 text-green-400">
                 <span className="font-heading text-2xl font-bold">{'>'}</span>
               </div>
               <input 
                 type="text" 
                 className="flex-1 bg-transparent border-none outline-none text-green-400 placeholder-green-700 h-auto text-lg font-bold font-mono"
                 placeholder={`INPUT REQUIREMENTS FOR ${docType}...`}
                 value={requirementsInput}
                 onChange={(e) => setRequirementsInput(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleGenerateOutline()}
               />
               <div className="pr-2 border-l-2 border-green-800 pl-4">
                 <AudioInput 
                    onTranscription={handleTranscription} 
                    status={status} 
                    setStatus={setStatus} 
                 />
               </div>
            </div>
         </div>

         {/* Action Buttons - New Cyber Button Style */}
         <div className="w-full mt-10 flex flex-col sm:flex-row gap-6 justify-start items-start sm:items-center">
              <CyberButton 
                onClick={() => {
                    setRequirementsInput("A decentralized voting platform on Ethereum using ZK-Snarks.");
                }}
                variant="primary"
                icon={DownloadIcon}
              >
                 LOAD_SAMPLE
              </CyberButton>

              <CyberButton 
                onClick={handleGenerateOutline}
                disabled={!requirementsInput.trim() || status === GenerationStatus.GENERATING}
                icon={SparklesIcon}
                variant="primary"
              >
                 INITIALIZE_BUILD
              </CyberButton>
         </div>
      </div>
    </div>
  );

  const renderOutlineView = () => (
    <div className="min-h-screen pt-24 px-4 pb-10 flex flex-col items-center max-w-5xl mx-auto relative z-10">
      <div className="w-full bg-black/90 border border-green-500 shadow-none fade-in">
        {/* Header */}
        <div className="p-4 border-b border-green-700 flex justify-between items-center bg-green-900/20">
          <div>
            <h2 className="text-xl font-bold text-green-400 font-mono uppercase flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 animate-pulse"></span>
              BLUEPRINT_PHASE_1
            </h2>
          </div>
          <button onClick={() => { soundManager.playClick(); setStep(WorkflowStep.INPUT); }} className="text-sm font-mono text-green-600 hover:text-green-400 uppercase">
            [ &lt;&lt; REVISE_INPUT ]
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 relative bg-[#050505]">
          <textarea 
            className="retro-textarea w-full min-h-[50vh] p-6 text-sm leading-relaxed resize-none focus:ring-0"
            value={outlineContent}
            onChange={(e) => setOutlineContent(e.target.value)}
          />
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-green-700 bg-green-900/20 flex justify-end gap-4">
           <CyberButton 
             onClick={handleGenerateDocument}
             disabled={status === GenerationStatus.GENERATING}
             icon={ChevronRightIcon}
           >
             EXECUTE_GENERATION
           </CyberButton>
        </div>
      </div>
    </div>
  );

  const renderResultView = () => (
    <div className="min-h-screen pt-24 px-4 pb-10 flex flex-col items-center max-w-6xl mx-auto relative z-10">
      <div className="w-full flex justify-between items-center mb-6 fade-in border-b border-green-800 pb-4">
        <h2 className="text-2xl font-bold text-green-400 font-mono uppercase">
          DOC_TYPE: {docType}
        </h2>
        <div className="flex gap-3">
          <CyberButton 
            onClick={() => handleVerify(docContent)}
            disabled={status === GenerationStatus.VERIFYING}
            variant="secondary"
            className="!px-4 !py-2 text-sm"
            icon={ShieldCheckIcon}
          >
            AUDIT
          </CyberButton>
          
          <div className="flex border border-green-700">
             <button onClick={() => {soundManager.playClick(); setViewMode('preview');}} className={`px-4 py-1.5 font-mono text-sm uppercase transition-colors ${viewMode === 'preview' ? 'bg-green-700 text-black' : 'text-green-700 hover:text-green-400'}`}>VIEW</button>
             <div className="w-px bg-green-700"></div>
             <button onClick={() => {soundManager.playClick(); setViewMode('edit');}} className={`px-4 py-1.5 font-mono text-sm uppercase transition-colors ${viewMode === 'edit' ? 'bg-green-700 text-black' : 'text-green-700 hover:text-green-400'}`}>EDIT</button>
          </div>

          <CyberButton 
            onClick={handleCopy} 
            variant="secondary"
            className="!px-4 !py-2 text-sm"
            icon={isCopied ? CheckIcon : CopyIcon}
          >
            {isCopied ? "COPIED" : "COPY"}
          </CyberButton>

          <CyberButton 
            onClick={handleDownload} 
            variant="secondary"
            className="!px-4 !py-2 text-sm"
            icon={DownloadIcon}
          >
             EXPORT
          </CyberButton>
        </div>
      </div>

      <div className="w-full bg-black/80 border border-green-800 shadow-none fade-in relative overflow-hidden">
         {/* Corner markers */}
         <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500"></div>
         <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500"></div>
         <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500"></div>
         <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500"></div>

         {viewMode === 'preview' ? (
           <div className="p-8 md:p-12 overflow-y-auto h-full max-h-[70vh]">
              <MarkdownRenderer content={docContent} />
           </div>
         ) : (
           <div className="p-8 h-full">
            <textarea 
             className="retro-textarea w-full h-full min-h-[60vh] p-6 text-sm leading-relaxed resize-none"
             value={docContent}
             onChange={(e) => setDocContent(e.target.value)}
            />
           </div>
         )}
      </div>
    </div>
  );

  const renderVerifyInputView = () => (
    <div className="min-h-screen pt-24 px-4 pb-10 flex flex-col items-center max-w-4xl mx-auto relative z-10">
        <div className="w-full text-center mb-8 fade-in">
            <h2 className="text-3xl font-heading font-bold text-green-400 mb-3 uppercase tracking-widest">System_Auditor</h2>
            <p className="text-green-600 font-mono uppercase text-sm">Paste external data for integrity analysis.</p>
        </div>

        <div className="w-full bg-black/90 border border-green-500 shadow-none overflow-hidden fade-in flex-1 flex flex-col relative">
            <div className="p-2 border-b border-green-700 bg-green-900/20 flex justify-between items-center">
                 <div className="flex gap-0 text-sm font-mono w-full">
                    <button 
                    onClick={() => {soundManager.playClick(); setDocType('PRD');}}
                    className={`flex-1 py-2 uppercase transition-colors ${docType === 'PRD' ? 'bg-green-700 text-black font-bold' : 'text-green-600 hover:text-green-400'}`}
                    >
                    TARGET: PRD
                    </button>
                    <div className="w-px bg-green-700"></div>
                    <button 
                    onClick={() => {soundManager.playClick(); setDocType('CLI');}}
                    className={`flex-1 py-2 uppercase transition-colors ${docType === 'CLI' ? 'bg-green-700 text-black font-bold' : 'text-green-600 hover:text-green-400'}`}
                    >
                    TARGET: CLI_REF
                    </button>
                </div>
            </div>

            <div className="p-6 flex-1 bg-[#050505]">
                <textarea 
                    className="retro-textarea w-full h-full min-h-[40vh] p-6 text-sm leading-relaxed placeholder-green-800 resize-none"
                    placeholder="> AWAITING DATA INPUT..."
                    value={verificationInput}
                    onChange={(e) => setVerificationInput(e.target.value)}
                />
            </div>

            <div className="p-4 border-t border-green-700 bg-green-900/20 flex justify-end">
                <CyberButton 
                    onClick={() => handleVerify(verificationInput)}
                    disabled={!verificationInput.trim() || status === GenerationStatus.VERIFYING}
                    icon={BrainIcon}
                >
                   RUN_DIAGNOSTICS
                </CyberButton>
            </div>
        </div>
    </div>
  );

  const renderAboutView = () => (
    <div className="min-h-screen pt-24 px-4 pb-10 flex flex-col items-center max-w-4xl mx-auto relative z-10 fade-in">
        <div className="w-full text-center mb-10">
            <div className="inline-block mb-4 px-3 py-1 border border-green-800 bg-green-900/10 rounded-full">
                <span className="text-xs font-bold text-green-500 uppercase tracking-widest">NEUI_PRD_V1.0</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-green-400 mb-4 tracking-tight uppercase glitch-slow">
                SYSTEM_MANIFEST
            </h2>
            <p className="text-green-600 font-mono text-sm uppercase tracking-wide max-w-2xl mx-auto">
                {'>'} DECLASSIFIED SPECIFICATIONS FOR NEURAL UPLINK INTERFACE
            </p>
        </div>

        <div className="w-full bg-black/80 border border-green-600 shadow-[0_0_20px_rgba(0,255,65,0.1)] p-8 md:p-10 relative overflow-hidden backdrop-blur-sm">
             {/* Decorative Corner Elements */}
             <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-green-500"></div>
             <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-green-500"></div>
             
             {/* CONTENT */}
             <div className="space-y-10 font-mono text-green-300">
                
                {/* Section 1 */}
                <section>
                    <h3 className="text-xl font-bold text-green-400 border-b border-green-800 pb-2 mb-4 flex items-center gap-2 glitch-slow">
                        <span className="text-green-600">01.</span> MISSION_PROTOCOL
                    </h3>
                    <TypewriterText 
                        text="NEUI PRD is an advanced AI-architecting tool designed to streamline the creation of technical documentation. By leveraging high-reasoning large language models, it transforms raw ideas and voice commands into structured Product Requirements Documents (PRDs), CLI references, and System Prompts." 
                        className="leading-relaxed opacity-90 min-h-[80px]"
                    />
                </section>

                {/* Section 2 - SIMPLIFIED */}
                <section>
                    <h3 className="text-xl font-bold text-green-400 border-b border-green-800 pb-2 mb-4 flex items-center gap-2 glitch-slow">
                        <span className="text-green-600">02.</span> NEURAL_ENGINE_SPECS
                    </h3>
                    <TypewriterText 
                        text="The architecture integrates a dual-core AI system. Gemini 3 Pro operates as the primary logic engine for generating complex, structured specifications, while Gemini 2.5 Flash functions as the sensory cortex, handling ultra-low latency voice transcription and real-time command processing."
                        speed={20}
                        className="leading-relaxed opacity-90 min-h-[60px]"
                    />
                </section>

                {/* Section 3 */}
                <section>
                     <h3 className="text-xl font-bold text-green-400 border-b border-green-800 pb-2 mb-4 flex items-center gap-2 glitch-slow">
                        <span className="text-green-600">03.</span> DEVELOPER_UPLINK
                    </h3>
                    <div className="flex flex-wrap gap-4 pt-2">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-5 py-3 border border-green-700 hover:bg-green-900/20 hover:border-green-400 transition-all">
                            <GithubIcon className="w-5 h-5 group-hover:text-white" />
                            <span className="text-sm font-bold uppercase">ACCESS_SOURCE_CODE</span>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-5 py-3 border border-green-700 hover:bg-green-900/20 hover:border-green-400 transition-all">
                            <LinkedinIcon className="w-5 h-5 group-hover:text-white" />
                            <span className="text-sm font-bold uppercase">CONNECT_NETWORK</span>
                        </a>
                    </div>
                </section>

             </div>
        </div>
        
        <div className="mt-8 text-center">
             <CyberButton onClick={() => setStep(WorkflowStep.INPUT)} icon={ChevronRightIcon}>
                RETURN_TO_CONSOLE
             </CyberButton>
        </div>
    </div>
  );

  // Main Render
  if (!hasBooted) {
      return <BootSequence onComplete={() => setHasBooted(true)} />;
  }

  // --- Modal (Verification) ---
  const renderVerificationModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-black border-2 border-green-500 shadow-none w-full max-w-2xl max-h-[80vh] flex flex-col relative fade-in">
        <div className="flex justify-between items-center p-4 border-b border-green-700 bg-green-900/30">
            <h3 className="text-xl font-heading text-green-400 uppercase flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5"/> AUDIT_REPORT
            </h3>
            <button onClick={() => {soundManager.playClick(); setIsVerificationModalOpen(false);}} className="text-green-600 hover:text-green-400">
                <XIcon />
            </button>
        </div>
        <div className="p-6 overflow-y-auto font-mono text-sm text-green-300">
            <MarkdownRenderer content={verificationReport} />
        </div>
        <div className="p-4 border-t border-green-700 bg-green-900/20 text-right">
            <button onClick={() => {soundManager.playClick(); setIsVerificationModalOpen(false);}} className="uppercase text-green-400 hover:text-white font-bold tracking-wider text-xs">
                [ CLOSE_REPORT ]
            </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-green-400 font-mono selection:bg-green-800 selection:text-green-100">
      {renderHeader()}
      
      {step === WorkflowStep.INPUT && renderHero()}
      {step === WorkflowStep.OUTLINE && renderOutlineView()}
      {step === WorkflowStep.RESULT && renderResultView()}
      {step === WorkflowStep.VERIFY_INPUT && renderVerifyInputView()}
      {step === WorkflowStep.ABOUT && renderAboutView()}

      {isVerificationModalOpen && renderVerificationModal()}

      {/* GLOBAL PROCESSING OVERLAY */}
      {(status === GenerationStatus.GENERATING || status === GenerationStatus.VERIFYING) && (
          <CyberProcessingOverlay message={getLoadingMessage()} />
      )}
    </div>
  );
};

export default App;
