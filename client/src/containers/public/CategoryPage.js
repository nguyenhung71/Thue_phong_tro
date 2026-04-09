import React, { useEffect, useState } from "react";
import { apiGetCategoryPosts } from "../../services/posts";

const CategoryPage = ({ categoryKey, fallbackTitle }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiGetCategoryPosts(categoryKey);

        if (!isMounted) return;

        if (response?.data?.err === 0) {
          setData(response.data.data);
        } else {
          setError(response?.data?.msg || "Khong the tai du lieu");
        }
      } catch (err) {
        if (!isMounted) return;
        setError("Khong the ket noi toi may chu");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [categoryKey]);

  const posts = data?.posts || [];
  const title = data?.header?.title || fallbackTitle;
  const description = data?.header?.description || "";

  if (loading) {
    return (
      <div className="w-full py-6">
        <div className="rounded-xl bg-white p-6 shadow-sm">Dang tai du lieu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-6">
        <div className="rounded-xl bg-white p-6 text-red-500 shadow-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full py-6">
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[760px]">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>
          </div>
          <div className="rounded-lg bg-primary px-4 py-3 text-sm text-gray-700">
            <span className="font-semibold text-secondary">{data?.totalPosts || posts.length}</span> tin dang hien co
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {posts.map((post, index) => {
          const image = post?.thumbnail || post?.detail?.media?.find((item) => item.type === "image")?.src;
          const address = post?.detail?.address || post?.location || "Dang cap nhat dia chi";
          const publishedAt = post?.detail?.publishedAt || "Dang cap nhat";
          const contactPhone = post?.detail?.contact?.phone || post?.author?.phone || "Lien he sau";

          return (
            <a
              key={`${post.link}-${index}`}
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="grid gap-4 p-4 md:grid-cols-[260px_1fr]">
                <div className="h-[180px] overflow-hidden rounded-lg bg-slate-100">
                  {image ? (
                    <img
                      src={image}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                      Khong co hinh anh
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold leading-7 text-slate-900">{post.title}</h2>
                    <p className="text-sm leading-6 text-slate-500">{post.summary || "Chua co mo ta ngan"}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-sm font-medium">
                    <span className="rounded-full bg-rose-50 px-3 py-1 text-rose-600">{post.price || "Thoa thuan"}</span>
                    <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700">{post.acreage || "Dang cap nhat dien tich"}</span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">{post.location || "Dang cap nhat khu vuc"}</span>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600">
                    <p><span className="font-semibold text-slate-800">Dia chi:</span> {address}</p>
                    <p><span className="font-semibold text-slate-800">Dang luc:</span> {publishedAt}</p>
                    <p><span className="font-semibold text-slate-800">Lien he:</span> {contactPhone}</p>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPage;
