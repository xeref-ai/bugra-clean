
import {ArrowRight, Check, ChevronsUpDown, Circle, Copy, Edit, ExternalLink, File, HelpCircle, Home, Loader2, Mail, MessageSquare, Mic, Moon, Plus, PlusCircle, Search, Server, Settings, Share2, Shield, Sun, Trash, User, Workflow, MoreHorizontal} from 'lucide-react';

export const LogoSvg = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} data-ai-hint="logo compass">
      <path d="M12 2L4 20L12 16L20 20L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

export const SparkleIcon = ({ className }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
            <linearGradient id="sparkle-gradient-page" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#A77DF4" />
                <stop offset="100%" stopColor="#5E8DFF" />
            </linearGradient>
        </defs>
        <path d="M12 2L14.25 9.75L22 12L14.25 14.25L12 22L9.75 14.25L2 2L9.75 9.75L12 2Z" fill="url(#sparkle-gradient-page)"/>
    </svg>
);

export const DiscordIcon = ({ className }: { className?: string }) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor">
        <path d="M18.942 5.556a16.299 16.299 0 0 0-4.126-1.317c-.453.079-.691.393-.589.815.127.522.428.879.932.964.69.117 1.339.261 1.954.434a13.624 13.624 0 0 1-2.996 1.13c-1.631.54-3.328.889-5.013.987-.453.023-.746.33-1.003.71-.806 1.233-1.42 2.686-1.854 4.226-.051.189-.044.38.019.56.126.368.465.59.84.623.36.033.702-.069.967-.291.314-.261.554-.582.75-.929a12.44 12.44 0 0 1 1.63-2.585c.102-.15.228-.285.369-.413a10.63 10.63 0 0 1 2.1-1.383 11.23 11.23 0 0 1 2.39-1.042c.118-.041.242-.07.368-.092a10.05 10.05 0 0 1 1.05-.125c.127-.008.254-.008.381.003.82.049 1.627.172 2.415.368.102.023.2.054.297.09.28.101.542.234.787.395.102.07.194.15.277.235a9.38 9.38 0 0 1 1.268 1.432c.216.299.412.61.58.932.189.36.438.691.758.935.281.21.6.309.917.309a1.04 1.04 0 0 0 .59-.188c.24-.16.42-.403.5-.677.06-.21.053-.438-.012-.648a17.91 17.91 0 0 0-1.851-4.258.913.913 0 0 0-.649-.512h-.001ZM9.495 14.992c-.894 0-1.618-.806-1.618-1.799s.724-1.799 1.618-1.799c.894 0 1.618.806 1.618 1.799s-.724 1.799-1.618-1.799Zm5.013 0c-.894 0-1.618-.806-1.618-1.799s.724-1.799 1.618-1.799c.894 0 1.618.806 1.618 1.799s-.724 1.799-1.618-1.799Z" />
    </svg>
);

const Icons = {
  arrowRight: ArrowRight,
  check: Check,
  chevronDown: ChevronsUpDown,
  circle: Circle,
  workflow: Workflow,
  close: X,
  copy: Copy,
  edit: Edit,
  externalLink: ExternalLink,
  file: File,
  help: HelpCircle,
  home: Home,
  light: Sun,
  loader: Loader2,
  mail: Mail,
  messageSquare: MessageSquare,
  mic:Mic,
  plus: Plus,
  plusCircle: PlusCircle,
  search: Search,
  server: Server,
  settings: Settings,
  share: Share2,
  shield: Shield,
  spinner: Loader2,
  trash: Trash,
  user: User,
  moreHorizontal: MoreHorizontal,
};

export {Icons};
