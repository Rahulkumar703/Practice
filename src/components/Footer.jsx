import { Button } from "./ui/button"

function Footer() {
    return (
        <footer className='flex items-center justify-center mt-auto bg-secondary rounded-t-lg'>Made with 💔 by
            <Button variant="link" asChild className="py-1 px-2">
                <a href="https://rahulsweb.in" className="text-destructive text-base">Rahul</a>
            </Button>
        </footer>
    )
}

export default Footer