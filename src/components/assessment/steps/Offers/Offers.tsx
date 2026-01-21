import React from "react";

interface PlanCardProps {
  title: string;
  pricePerDay: string;
  originalPerDay?: string;
  duration: string;
  discount: string;
  totalPrice: string;
  originalTotal: string;
  highlighted?: boolean;
  rounded?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  pricePerDay,
  originalPerDay,
  duration,
  discount,
  totalPrice,
  originalTotal,
  highlighted,
  rounded
}) => {
  return (
<div
  className={` border p-4 mb-4 ${rounded ? "rounded-xl" : ""} transition-shadow ${
    highlighted
      ? "bg-sky-50 border-sky-500 shadow-md"
      : "bg-white border-gray-200"
  }`}
>
  {/* Grid Container */}
  <div className="grid grid-cols-2 gap-4 items-start">
    
    <div className="flex flex-col gap-2">
      <span className="font-semibold">{duration}</span>

      <div className="bg-sky-400 text-white text-sm px-2 py-1 rounded-full w-fit">
        {discount}
      </div>

      <div className="mt-2 flex gap-2 font-normal text-sm">
        <span className="text-red-500  line-through block">
          {originalTotal}
        </span>
        <span className="font-semibold block">{totalPrice}</span>
      </div>



    </div>


    <div className="flex flex-col items-end gap-2 text-left">
<div>
  
<div className="flex gap-8 relative">
              {originalPerDay && (
        <div className="text-sm text-red-500 line-through">
          {originalPerDay} 
        </div>
      )}
      <span className="absolute left-8 font-bold text-gray-400 text-4xl"> 1</span>
        <div className="font-bold  text-[12px] flex flex-col">
          <span className="text-gray-400">{pricePerDay}</span>
      <span className="text-gray-400">يوميًا</span>

        </div>
</div>      
      <br />
</div>


    </div>

  </div>
</div>

  );
};

interface BefluentOfferProps {
  onComplete?: () => void;
}

const BefluentOffer: React.FC<BefluentOfferProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-md bg-white s shadow p-4">
        {/* Header */}
        <div className="bg-blue-50 rounded-xl p-3 flex  justify-between items-center mb-6">

          <div className="flex  gap-2 flex-col  font-semibold">
            <span>خصم 60% محجوز لك لمدة:</span>
            <span className="flex items-center gap-1 text-sky-400">
              <span>⏱</span>
              7:17
            </span>
          </div>
                    <button 
            className="bg-sky-500 text-white px-4 py-1 rounded-sm text-[14px] font-semibold hover:bg-sky-600 transition"
            onClick={onComplete}
          >
            استمرار
          </button>
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-bold text-sky-400 mb-2">
          BeFluent
        </h1>
        <p className="text-center text-blue-900 text-lg font-semibold mb-4 flex flex-col gap-1">
احصل علي وصول غير محدود
        <span
        className="text-[12px] "
        >تعلم وقتما تشاء وأينما كنت بكل مرونة.</span>

        </p>
        {/* Features */}
        <ul className="space-y-2 text-sm mb-6">
          <li className="font-bold text-sky-800 "><span>👥</span> تدريبات تفاعلية بلا حدود</li>
          <li className="font-bold text-sky-800 "><span>📝</span> خطة دراسة مصممة خصيصًا لك</li>
          <li className="font-bold text-sky-800 "><span>💯</span> ملاحظات فورية من الذكاء الاصطناعي</li>
          <li className="font-bold text-sky-800 "><span>⛳</span> تابع تقدمك وتحكم في مسارك</li>
        </ul>

        {/* Plans */}
        <div>
          <div className="text-center text-sm bg-sky-500 text-white py-1 rounded-t-lg">
            الأكثر شعبية
          </div>
          <PlanCard
            title="سنة واحدة"
            pricePerDay="6.36 "
            originalPerDay="16.67 "
            duration="سنة واحدة"
            discount="وفر 60%"  
            totalPrice="199 "
            originalTotal="500 "
            highlighted={false}
            rounded={false}

          />
          <PlanCard
            title="3 شهور"
            pricePerDay="3.33 "
            originalPerDay="10 "
            duration="3 شهور"
            discount="وفر 67%"  
            totalPrice="100 "
            originalTotal="300 "
            highlighted={true}
            rounded={true}
          />

        </div>

        {/* CTA */}
        <button 
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          onClick={onComplete}
        >
          اشترك الآن
        </button>
      </div>
    </div>
  );
};

export default BefluentOffer;