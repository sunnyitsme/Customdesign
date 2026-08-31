import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/service/ServicePageView";
import { mortgageGuides } from "@/content/service-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return mortgageGuides.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = mortgageGuides.find((entry) => entry.slug === slug);
  if (!page) return {};
  return { title: page.title, description: page.scope };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = mortgageGuides.find((entry) => entry.slug === slug);
  if (!page) notFound();

  return (
    <ServicePageView
      page={page}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Mortgages", href: "/mortgages" },
        { label: "Guides", href: "/mortgages/guides" },
        { label: page.navLabel },
      ]}
    />
  );
}
