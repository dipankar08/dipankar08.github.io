import Sidebar from "./screen/Sidebar";
import ContentArea from "./screen/ContentArea";

export default function App() {
  return (
    <div className="max-w-[1200px] mx-auto flex min-h-screen">
      <Sidebar />
      <ContentArea />
    </div>
  );
}
