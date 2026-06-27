import React from "react";
import techMapping from "@/data/technology-mapping.json";
import { Typescript } from "@/components/ui/svgs/typescript";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";
import { RAG } from "@/components/ui/svgs/RAG";
import { Express } from "@/components/ui/svgs/express";
import { Git } from "@/components/ui/svgs/git";
import { Bitbucket } from "@/components/ui/svgs/bitbucket";
import { SQL } from "@/components/ui/svgs/sql";
import { Icons } from "@/components/icons";

// Map of string keys to React components
const svgRegistry: Record<string, React.ComponentType<any>> = {
  typescript: Typescript,
  reactLight: ReactLight,
  nextjsIconDark: NextjsIconDark,
  nodejs: Nodejs,
  python: Python,
  postgresql: Postgresql,
  docker: Docker,
  kubernetes: Kubernetes,
  java: Java,
  csharp: Csharp,
  rag: RAG,
  express: Express,
  git: Git,
  bitbucket: Bitbucket,
  sql: SQL,
  openai: Icons.openai,
  github: Icons.github,
  linkedin: Icons.linkedin,
  leetcode: Icons.leetcode,
  geeksforgeeks: Icons.geeksforgeeks,
  globe: Icons.globe,
  email: Icons.email,
  nextjs: Icons.nextjs,
  react: Icons.react,
  tailwindcss: Icons.tailwindcss,
};

interface TechIconProps extends React.ComponentPropsWithoutRef<"img"> {
  name: string;
}

export function TechIcon({ name, className, ...props }: TechIconProps) {
  const iconSource = (techMapping as Record<string, string>)[name];

  if (!iconSource) {
    return null;
  }

  if (iconSource.startsWith("/") || iconSource.startsWith("http")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={iconSource}
        alt={name}
        className={className}
        {...props}
      />
    );
  }

  const SvgComponent = svgRegistry[iconSource];
  if (SvgComponent) {
    return <SvgComponent className={className} {...(props as any)} />;
  }

  return null;
}
export default TechIcon;
