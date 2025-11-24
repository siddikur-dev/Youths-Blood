"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import gsap from "gsap";

interface BloodRequest {
  _id?: string;
  patientName?: string;
  bloodGroup?: string;
  requiredUnits?: number;
  location?: string;
  urgency?: string;
  neededDate?: string;
  hospitalName?: string;
  status?: string;
}

export default function BloodCards() {
  const [items, setItems] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const typeRef = useRef<HTMLHeadingElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setError(null);
        const res = await fetch("http://localhost:5000/bloods");
        if (!res.ok) throw new Error("Failed to fetch data");
        
        const data = await res.json();
        if (!mounted) return;
        
        // API may return { success, data } or an array directly
        if (data) {
          if (Array.isArray(data)) {
            setItems(data);
          } else if (data.success && Array.isArray(data.data)) {
            setItems(data.data);
          } else {
            setItems([]);
          }
        } else {
          setItems([]);
        }
      } catch (err) {
        console.error("Error fetching bloods:", err);
        if (mounted) {
          setError("Failed to load blood requests");
          setItems([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  // Animate cards when items change
  useEffect(() => {
    if (!containerRef.current) return;
    const cards = Array.from(containerRef.current.querySelectorAll(".bc-card"));
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { y: 20, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }
    );
  }, [items]);

  // Simple typewriter effect for heading
  useEffect(() => {
    const el = typeRef.current;
    if (!el) return;
    const text = "Latest Blood Requests";
    let i = 0;
    el.textContent = "";
    const interval = setInterval(() => {
      el.textContent = text.slice(0, i + 1);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Urgency badge color
  const getUrgencyColor = (urgency: string) => {
    switch (urgency?.toLowerCase()) {
      case 'emergency':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'urgent':
        return 'bg-orange-100 text-orange-800 border border-orange-200';
      default:
        return 'bg-blue-100 text-blue-800 border border-blue-200';
    }
  };

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-red-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 ref={typeRef} className="text-2xl md:text-4xl font-black text-gray-900 mb-4"></h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Recent blood donation requests from our community. Your help can save lives.
          </p>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-center">
              <p className="font-medium">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {loading && (
            Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                className="bc-card p-6 rounded-2xl bg-white border border-gray-200 shadow-sm animate-pulse h-48"
              >
                <div className="flex justify-between mb-4">
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded-full w-16"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="flex justify-between mt-6">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))
          )}

          {!loading && items.length === 0 && !error && (
            <div className="col-span-1 md:col-span-3 text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🩸</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">No Blood Requests</h4>
              <p className="text-gray-600 max-w-md mx-auto">
                There are no active blood requests at the moment. Check back later or be the first to request.
              </p>
            </div>
          )}

          {!loading && (showAll ? items : items.slice(0, 6)).map((it, idx) => (
            <div 
              key={it._id || idx} 
              className="bc-card group p-6 rounded-2xl bg-white border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => router.push(`/blood-request/${it._id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                    {it.patientName || 'Anonymous Patient'}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1 flex items-center">
                    <span className="mr-2">🏥</span>
                    {it.hospitalName || it.location || 'Location not specified'}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <span className="inline-block px-3 py-1 bg-red-50 text-red-600 rounded-full font-bold text-sm border border-red-200">
                    {it.bloodGroup || 'N/A'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Required Units:</span>
                  <span className="font-semibold text-gray-900">{it.requiredUnits || 'Not specified'}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Urgency:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(it.urgency || 'normal')}`}>
                    {it.urgency || 'Normal'}
                  </span>
                </div>

                {it.status && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(it.status)}`}>
                      {it.status}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-500">
                  <span className="mr-2">📅</span>
                  Needed by: {it.neededDate ? new Date(it.neededDate).toLocaleDateString() : 'ASAP'}
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); router.push(`/blood-request/${it._id}`); }}
                  className="text-red-600 font-medium hover:text-red-700 transition-colors text-sm group-hover:underline"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
        {!loading && items.length > 6 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              {showAll ? 'Show Less' : 'Show All'}
              <span className="ml-2">→</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}