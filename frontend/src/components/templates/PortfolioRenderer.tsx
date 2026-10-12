"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import { getTemplateComponent } from "@/lib/templates/registry";

export function PortfolioRenderer({ portfolio, isPreview = false }: { portfolio: IPortfolio; isPreview?: boolean }) {
  const templateId = portfolio.template || "professional";
  const TemplateComponent = getTemplateComponent(templateId);

  return (
    <div className="w-full overflow-x-hidden min-h-full">
      <TemplateComponent portfolio={portfolio} isPreview={isPreview} />
    </div>
  );
}

export default PortfolioRenderer;
