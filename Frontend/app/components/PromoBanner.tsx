import Image from "next/image"

export default function PromoBanner() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-pink-200 via-blue-200 to-teal-200 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Every purchase will
                <br />
                be made with pleasure
              </h2>

              <div className="flex items-center space-x-6 mb-6">
                <div className="bg-orange-500 text-white px-6 py-3 rounded-lg">
                  <div className="text-sm font-medium">STARTING AT</div>
                  <div className="text-2xl font-bold">$99.99</div>
                </div>

                <div className="text-gray-700">
                  <div className="text-lg font-medium">SAVE</div>
                  <div className="text-lg font-medium">UPTO</div>
                  <div className="text-3xl font-bold">$1,000</div>
                </div>
              </div>
            </div>

            <div className="hidden md:block relative w-80 h-64">
              <Image
                src="https://placehold.co/400x300/E5E7EB/333?text=Fashion+Model"
                alt="Fashion Model"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
