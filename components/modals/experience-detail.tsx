"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Briefcase,
  ExternalLink,
  Building,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ExperienceState } from "@/app/api/experiences/[slug]/route";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

type ExperienceDetailProps = {
  isOpen: boolean;
  setIsOpenAction: (isOpen: boolean) => void;
  slug: string;
};

export default function ExperienceDetail({
  isOpen,
  setIsOpenAction,
  slug,
}: ExperienceDetailProps) {
  const [detail, setDetail] = useState<ExperienceState | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!slug || !isOpen) return;

    setLoading(true);
    const fetchExperienceDetail = async () => {
      try {
        const response = await fetch(`/api/experiences/${slug}`);
        if (!response.ok) {
          setDetail(null);
          return;
        }
        const detailData = await response.json();
        // Add a small delay to show the loading animation
        setTimeout(() => {
          setDetail(detailData);
          setLoading(false);
        }, 400);
      } catch {
        setDetail(null);
        setTimeout(() => {
          setDetail(null);
          setLoading(false);
        }, 400);
      }
    };

    fetchExperienceDetail();
  }, [slug, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpenAction}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-[85vh] sm:h-[90vh] flex flex-col mx-auto">
        <DialogHeader className="flex-shrink-0 p-3 sm:p-4 md:p-6 pb-2 sm:pb-3 md:pb-4 rounded-t-md">
          <div className="flex items-center justify-between mb-2">
            <Badge
              variant="outline"
              className="text-xs font-medium bg-primary/10 text-primary"
            >
              {detail?.type}
            </Badge>
          </div>
          <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-primary leading-tight text-left">
            {detail?.title}
          </DialogTitle>
          <div className="flex items-center gap-2 mt-1">
            <Building className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base md:text-lg truncate">
              {detail?.company}
            </span>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 pt-2 sm:pt-3 md:pt-4">
          {loading ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Skeleton className="h-[60px] sm:h-[70px] w-full rounded-lg" />
                <Skeleton className="h-[60px] sm:h-[70px] w-full rounded-lg" />
              </div>

              <div>
                <Skeleton className="h-5 sm:h-6 w-24 sm:w-32 mb-2" />
                <Skeleton className="h-[60px] sm:h-[80px] w-full rounded" />
              </div>

              <div>
                <Skeleton className="h-5 sm:h-6 w-32 sm:w-40 mb-2" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>

              <div>
                <Skeleton className="h-5 sm:h-6 w-28 sm:w-36 mb-2" />
                <div className="flex gap-2 flex-wrap">
                  <Skeleton className="h-6 w-16 sm:w-20 rounded-full" />
                  <Skeleton className="h-6 w-14 sm:w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 sm:w-24 rounded-full" />
                </div>
              </div>

              <div className="border-t pt-3 sm:pt-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                  <Skeleton className="h-4 w-20 sm:w-24" />
                  <Skeleton className="h-4 w-24 sm:w-32" />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-muted/50 rounded-lg">
                  <div className="p-1.5 sm:p-2 bg-primary/10 rounded-full flex-shrink-0">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      Period
                    </div>
                    <div className="font-medium text-sm sm:text-base truncate">
                      {detail?.period}
                    </div>
                  </div>
                </div>
                <Link href={detail?.locations_url ?? "#"} target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-muted/50 rounded-lg">
                    <div className="p-1.5 sm:p-2 bg-primary/10 rounded-full flex-shrink-0">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        Location
                      </div>
                      <div className="font-medium text-sm sm:text-base truncate">
                        {detail?.location}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="mt-4 sm:mt-6">
                <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2 mb-2 sm:mb-3">
                  <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  Overview
                </h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: detail?.description || "",
                  }}
                  className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                />
              </div>

              <div className="mt-4 sm:mt-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
                  Key Responsibilities
                </h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {detail?.responsibilities?.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 text-sm">
                        •
                      </span>
                      <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {resp}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 sm:mt-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {detail?.technologies?.map((tech, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-primary/5 hover:bg-primary/10 text-xs sm:text-sm px-2 py-1"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">{detail?.current_period}</span>
                  </div>
                  <div className="text-primary hover:text-primary/80 p-0 h-auto text-xs sm:text-sm">
                    <a
                      href={detail?.company_url ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                      Visit Company
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
