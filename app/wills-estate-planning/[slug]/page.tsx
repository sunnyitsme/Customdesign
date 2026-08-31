import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/service/ServicePageView";
import { willsPages } from "@/content/service-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return willsPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = willsPages.find((entry) => entry.slug === slug);
  if (!page) return {};
  return { title: page.title, description: page.scope };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = willsPages.find((entry) => entry.slug === slug);
  if (!page) notFound();

  return (
    <ServicePageView
      page={page}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Wills & Estate Planning", href: "/wills-estate-planning" },
        { label: page.navLabel },
      ]}
    />
  );
}
