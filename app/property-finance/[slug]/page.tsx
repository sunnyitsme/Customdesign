import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/service/ServicePageView";
import { propertyFinancePages } from "@/content/service-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return propertyFinancePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = propertyFinancePages.find((entry) => entry.slug === slug);
  if (!page) return {};
  return { title: page.title, description: page.scope };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = propertyFinancePages.find((entry) => entry.slug === slug);
  if (!page) notFound();

  return (
    <ServicePageView
      page={page}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Property Finance", href: "/property-finance" },
        { label: page.navLabel },
      ]}
    />
  );
}
