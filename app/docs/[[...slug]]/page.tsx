import { getPage, getPages } from "@/app/source";
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
  DocsCategory,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultComponents from "fumadocs-ui/mdx";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { AutoTypeTable } from "fumadocs-typescript/ui";
import { Metadata } from "next";
import { ComponentWrapper } from "@/components/component-wrapper";
import { getGithubLastEdit } from "fumadocs-core/server";

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params; // Await the promise for params
  const slug = params.slug ? params.slug.join("/") : ""; // Handle slug properly
  const page = getPage(params.slug); // Get the page based on the slug

  if (!page) {
    notFound(); // Throw 404 if the page is not found
  }

  const time = await getGithubLastEdit({
    owner: "Hackclub-OC",
    repo: "Vision-OS",
    path: `content/docs/${page.file.path}`,
  });

  const MDX = page.data.body; // Extract MDX content

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{
        style: "clerk",
      }}
      lastUpdate={time ? new Date(time) : undefined}
      editOnGithub={{
        owner: "Hackclub-OC",
        repo: "Vision-OS",
        sha: "main",
        path: `content/docs/${page.file.path}`,
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={{
            ...defaultComponents,
            AutoTypeTable,
            ComponentWrapper,
            Tab,
            Tabs,
          }}
        />
        {page.data.index ? (
          <DocsCategory page={page} pages={getPages()} />
        ) : null}
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  const params = await getPages(); // Fetch the pages dynamically
  return params.map((page) => ({
    slug: page.slugs, // Return the correct slug structure
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params; // Await the promise for params
  const slug = params.slug ? params.slug.join("/") : "index"; // Construct the slug for metadata
  const page = getPage(params.slug);

  if (!page) {
    notFound(); // Return 404 if the page is not found
  }

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      url: `/docs/${slug}`, // Ensure metadata reflects `/docs/` paths
    },
  } as Metadata;
}
