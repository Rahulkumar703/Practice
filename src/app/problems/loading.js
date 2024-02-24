import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
                <Skeleton className={'h-4 w-[100px]'} />
                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2">
                    <Skeleton className={'h-[200px] w-full'} />
                    <Skeleton className={'h-[200px] w-full'} />
                    <Skeleton className={'h-[200px] w-full'} />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton className={'h-4 w-[100px]'} />
                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2">
                    <Skeleton className={'h-[200px] w-full'} />
                    <Skeleton className={'h-[200px] w-full'} />
                </div>
            </div>
        </div>
    )
}

export default loading
