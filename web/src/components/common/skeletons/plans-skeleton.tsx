import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-muted rounded ${className}`} />
}

export function PlansPageSkeleton() {
  return (
    <div className="mx-auto space-y-8">
      <Card className="bg-muted/30 border border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-7 w-24" />
            </div>
          </div>
          <div className="text-right space-y-2">
            <div className="space-y-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-7 w-32" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
            <Skeleton className="h-4 w-12" />
          </Badge>
        </CardHeader>
      </Card>

      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Plan 1 */}
          <Card className="relative border border-border">
            <CardHeader className="text-center space-y-4">
              <Skeleton className="h-6 w-24 mx-auto" />
              <div className="space-y-2">
                <Skeleton className="h-10 w-32 mx-auto" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Plan 2 - Popular */}
          <Card className="relative border border-border">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-primary/20 text-primary">
                <Skeleton className="h-4 w-16" />
              </Badge>
            </div>
            <CardHeader className="text-center space-y-4 pt-8">
              <Skeleton className="h-6 w-24 mx-auto" />
              <div className="space-y-2">
                <Skeleton className="h-10 w-32 mx-auto" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Plan 3 - Current */}
          <Card className="relative border border-border">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                <Skeleton className="h-4 w-16" />
              </Badge>
            </div>
            <CardHeader className="text-center space-y-4 pt-8">
              <Skeleton className="h-6 w-24 mx-auto" />
              <div className="space-y-2">
                <Skeleton className="h-10 w-36 mx-auto" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
