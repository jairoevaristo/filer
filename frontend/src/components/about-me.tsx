import { GithubIcon, Instagram, Linkedin } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { DialogHeader } from "./ui/dialog";

type AboutMeProps = {
  open: boolean;
  handleClose: () => void;
};

export const AboutMe = ({ handleClose, open }: AboutMeProps) => {
  return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="min-h-[36vh] px-6 min-w-[32vw] flex flex-col items-center justify-center">
                <DialogHeader className="space-y-0">
                    <DialogTitle>
                        <h1 className="font-bold text-4xl mb-4">Hi 👋🏼</h1>
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-center">
                    I'm Jairo Evaristo Software Develop at 
                    <a 
                        href="https://www.osf.digital/"
                        className="underline ml-1"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                            OSF Digital
                    </a>

                    <div className="flex justify-center gap-6 mt-6">
                        <div className="flex items-center gap-1">
                            <GithubIcon className="w-4 h-4" />
                            <a 
                                href="https://github.com/jairoevaristo/"
                                target="_blank"
                                className="hover:underline"
                                rel="noopener noreferrer"
                            >
                                @jairoevaristo
                            </a>
                        </div>

                        <div className="flex items-center gap-1">
                            <Linkedin className="w-4 h-4" />
                            <a 
                                href="https://linkedin.com/in/jairo-evaristo/"
                                target="_blank"
                                className="hover:underline"
                                rel="noopener noreferrer"
                            >
                                @jairo-evaristo
                            </a>
                        </div>

                        <div className="flex items-center gap-1">
                            <Instagram className="w-4 h-4" />
                            <a 
                                href="https://www.instagram.com/jairo_evaristo12/"
                                target="_blank"
                                className="hover:underline"
                                rel="noopener noreferrer"
                            >
                                @jairo_evaristo12
                            </a>
                        </div>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};