import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type ApplicationListSkeletonProps = {
  count?: number;
};

export function ApplicationListSkeleton({
  count = 4,
}: ApplicationListSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index}>
          <CardContent className="space-y-3 p-4">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-64" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
