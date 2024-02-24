

export async function generateMetadata({ params }) {
    return {
        title: params.title,
        description: `solve the problem ${params.title}`,
    };
}

const DashboardLayout = ({ children }) => {
    return (
        children
    )
}

export default DashboardLayout
