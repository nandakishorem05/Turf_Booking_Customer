import { notFound } from "next/navigation";
import { MOCK_TURFS } from "@/lib/mock-data";
import { TurfDetailView } from "@/components/turf-detail-view";

export async function generateStaticParams() {
  return MOCK_TURFS.map((t) => ({ slug: t.slug }));
}

export default async function TurfDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const turf = MOCK_TURFS.find((t) => t.slug === slug);

  if (!turf) {
    notFound();
  }

  return <TurfDetailView turf={turf} />;
}
