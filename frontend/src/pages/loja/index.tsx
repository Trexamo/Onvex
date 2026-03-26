import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';

export default function Loja() {
  return (
    <>
      <Head>
        <title>Loja - Onvex</title>
      </Head>
      <div className="min-h-screen bg-[#F4F5F9]">
        <Sidebar />
        <Header />
        <main className="ml-[240px] p-6">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Loja</h1>
            <p className="text-gray-600 mb-6">Página em desenvolvimento</p>
            <Link href="/" className="text-[#2fde91] hover:underline">
              Voltar para Dashboard
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
