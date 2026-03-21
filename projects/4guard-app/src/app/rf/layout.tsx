import MobileRFLayout from "@/components/layout/MobileRFLayout";

export default function RFRouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <MobileRFLayout>
        {children}
    </MobileRFLayout>
  );
}
