import { Skeleton } from "./ui/skeleton"

export const LoadingSkeletonItem = () => {
    return (
        <div className="w-[24vw] rounded">
            <Skeleton className="h-72 w-[24vw] rounded-xl" />
            <div className="mt-2">
                <Skeleton className="w-[24vw] h-20" />
            </div>
        </div>
    )
}