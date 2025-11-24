// app/blood-request/page.tsx
import BloodRequestForm from '../../components/BloodRequestForm';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function BloodRequestPage() {
  return (
    <ProtectedRoute>
      <BloodRequestForm />
    </ProtectedRoute>
  );
}