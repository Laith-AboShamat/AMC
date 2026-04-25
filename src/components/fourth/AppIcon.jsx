import {
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FlaskConical,
  Globe,
  GraduationCap,
  Home,
  Lightbulb,
  Link as LinkIconLucide,
  Mail,
  Menu,
  Phone,
  Play,
  Puzzle,
  Rocket,
  SearchCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'

const iconMap = {
  AcademicCapIcon: GraduationCap,
  ArrowRightIcon: ArrowRight,
  ArrowTrendingUpIcon: TrendingUp,
  ArrowUpRightIcon: ChevronRight,
  Bars3Icon: Menu,
  BeakerIcon: FlaskConical,
  BuildingOffice2Icon: Building2,
  CalendarIcon: Calendar,
  CheckCircleIcon: CheckCircle2,
  ClipboardDocumentCheckIcon: ClipboardCheck,
  DocumentMagnifyingGlassIcon: SearchCheck,
  EnvelopeIcon: Mail,
  GlobeAltIcon: Globe,
  HomeIcon: Home,
  LightBulbIcon: Lightbulb,
  LinkIcon: LinkIconLucide,
  PhoneIcon: Phone,
  PlayIcon: Play,
  PuzzlePieceIcon: Puzzle,
  RocketLaunchIcon: Rocket,
  SparklesIcon: Sparkles,
  StarIcon: Star,
  UserGroupIcon: Users,
  XMarkIcon: X,
}

export function AppIcon({ name, size = 24, className = '', strokeWidth = 2, ...props }) {
  const Icon = iconMap[name] ?? Sparkles

  return <Icon size={size} strokeWidth={strokeWidth} className={className} {...props} />
}