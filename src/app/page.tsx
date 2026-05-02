import Sidebar from "../screen/Sidebar";
import ContentArea from "../screen/ContentArea";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <ContentArea />
    </div>
  );
}
