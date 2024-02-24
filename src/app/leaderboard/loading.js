import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
    return (
        <div className="flex flex-col gap-10">
            <Skeleton className={'h-[200px] w-full border'} />
        </div>
    )
}

export default loading
