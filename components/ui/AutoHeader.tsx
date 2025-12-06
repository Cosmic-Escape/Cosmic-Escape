import HoloSectionHeader from "@/components/ui/HoloSectionHeader";

export default function AutoHeader({ title, subtitle }) {
  return (
    <div className="pt-12">
      <HoloSectionHeader title={title} subtitle={subtitle} />
    </div>
  );
}
