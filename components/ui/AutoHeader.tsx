import HoloSectionHeader from "@/components/ui/HoloSectionHeader";

interface AutoHeaderProps {
  title: string;
  subtitle?: string; // optional if subtitle may not exist
}

export default function AutoHeader({ title, subtitle }: AutoHeaderProps) {
  return (
    <div className="pt-12">
      <HoloSectionHeader title={title} subtitle={subtitle} />
    </div>
  );
}
