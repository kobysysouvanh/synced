import { CodeGenerator } from "@/components/CodeGenerator"
import { UserService } from "@/lib/db/user-service"
import { getCurrentUserData } from "@/lib/user-data"
import { SignOutButton } from "@clerk/nextjs"

const Dashboard = async () => {
    const user = await getCurrentUserData()
    const isCoupled = await UserService.isUserCoupled()
    const coupleData = await UserService.getCurrentCouple()

    if (!isCoupled) {
        return <CodeGenerator/>
    }

    return (
        <div className="flex flex-col p-6 max-w-2xl mx-auto space-y-6">
            {/* User Info */}
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold mb-2">
                    Welcome, {user?.user?.firstName}! 👋
                </h1>
                <SignOutButton />
            </div>

            {/* Couple Info */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">💕 You're Coupled Up!</h2>
                <div className="space-y-2">
                    <p><strong>Partner:</strong> {coupleData?.partner?.firstName} {coupleData?.partner?.lastName}</p>
                    <p><strong>Email:</strong> {coupleData?.partner?.email}</p>
                    <p><strong>Coupled Since:</strong> {coupleData?.createdAt?.toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard