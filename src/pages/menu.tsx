import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/cafe.jpg";
import useSWR from "swr";
import { Coffee } from "../lib/models";
import Loading from "../components/loading";
import { Alert, Button } from "@mantine/core";
import { IconAlertTriangleFilled, IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function MenuPage() {
  const { data: Coffee, error } = useSWR<Coffee[]>("/coffee");

  return (
    <>
      <Layout>
        <section
          className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
          style={{
            backgroundImage: `url(${cafeBackgroundImage})`,
          }}
        >
          <h1 className="text-5xl mb-2">Menu</h1>
          <h2>รายการเครื่องดื่มทั้งหมด</h2>
        </section>

        <section className="container mx-auto py-8">
          <div className="flex justify-between pb-16">
            <h1>รายการเครื่องดื่ม</h1>

            <Button
              component={Link}
              leftSection={<IconPlus />}
              to="/menu/create"
              size="xs"
              variant="primary"
              className="flex items-center space-x-2"
            >
              เพิ่มเครื่องดื่ม
            </Button>
          </div>

          {!Coffee && !error && <Loading />}
          {error && (
            <Alert
              color="red"
              title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
              icon={<IconAlertTriangleFilled />}
            >
              {error.message}
            </Alert>
          )}

          {Coffee?.length === 0 && <p>No coffee Now</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Coffee?.map((coffee) => (
              <div className="border border-solid border-neutral-200 rounded-lg overflow-hidden flex flex-col" key={coffee.id}>
                <img
                  src={`https://placehold.co/400x300?text=${encodeURIComponent(coffee.name)}`}
                  alt={coffee.name}
                  className="w-full object-cover aspect-[4/3]"
                />
                <div className="p-4 flex-grow">
                  <h2 className="text-lg font-semibold line-clamp-2">{coffee.name}</h2>
                  <p className="text-xs text-neutral-500 break-words">{coffee.description}</p>
                </div>
                <div className="flex justify-between items-center px-4 pb-4 mt-auto">
                  <div className="text-lg font-semibold">{coffee.price} Baht</div>
                  <Button
                    component={Link}
                    to={`/coffee/${coffee.id}`}
                    size="xs"
                    variant="default"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
                  >
                    สั่งเครื่องดื่ม
                  </Button>
                </div>
              </div>
            ))}
          </div>




        </section>
      </Layout>
    </>
  );
}
