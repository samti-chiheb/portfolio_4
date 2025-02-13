import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";

import ContentBody from "@/components/ContentBody";
import { headers } from "next/headers";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  return <ContentBody page={page} />;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  // Récupérer le domaine du site dynamiquement depuis les headers
  const host = headers().get("host") || "yourwebsite.com";
  const protocol = host.includes("localhost") ? "http" : "https"; // Utiliser https en prod
  const siteUrl = `${protocol}://${host}`;

  const imageUrl = page?.data?.image?.url
    ? page.data.image.url
    : `${siteUrl}${page.data.image.url}`;

  console.log(siteUrl);

  return {
    title: page.data.title,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.title!,
      description: page.data.meta_description!,
      url: `${siteUrl}/${params.uid}`,
      type: "website",
      siteName: "Cash Tracker",
      images: [
        {
          url: imageUrl,
          alt: page.data.title!,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title!,
      description: page.data.meta_description!,
      images: [imageUrl],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_post");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
