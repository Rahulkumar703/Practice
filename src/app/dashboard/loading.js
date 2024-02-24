import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
    return (
        <div className="flex flex-col gap-10">
            <div className="grid sm:grid-cols-2 place-items-center gap-5">
                <Skeleton className={'h-[200px] w-full'} />
                <Skeleton className={'h-[200px] w-full'} />
            </div>
            <Skeleton className={'h-[300px] w-full border'} />
        </div>
    )
}

export default loading
