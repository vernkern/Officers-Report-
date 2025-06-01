import React, { useState, useEffect } from 'react';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Officer Details
    officerDetails: {
      name: '',
      occupation: '',
      address: '',
      currentDuties: '',
      age: '',
      yearsOfService: '',
      contact: '',
      education: '',
      certifyingStatement: '',
      serviceHub: '',
      parish: ''
    },
    // Request Details
    requestDetails: {
      rank: '',
      name: '',
      assignedStation: '',
      parish: '',
      date: '',
      locationOtherThanStation: ''
    },
    // Crash Details
    crashDate: '',
    crashLocation: '',
    // Vehicle 1
    vehicle1: {
      vehicleClass: 'Private',
      driverName: '',
      driverAddress: '',
      driverTel: '',
      driverTrn: '',
      ownerName: '',
      ownerAddress: '',
      ownerTel: '',
      ownerTrn: '',
      make: '',
      model: '',
      year: '',
      plateNumber: '',
      chassisVin: '',
      pointOfImpact: '',
      bodyDamage: '',
      staticTestConducted: false,
      defectsFromCrash: false,
      certificateOfDefectNo: '',
      heavilyTinted: false
    },
    // Vehicle 2
    vehicle2: {
      vehicleClass: 'Private',
      driverName: '',
      driverAddress: '',
      driverTel: '',
      driverTrn: '',
      ownerName: '',
      ownerAddress: '',
      ownerTel: '',
      ownerTrn: '',
      make: '',
      model: '',
      year: '',
      plateNumber: '',
      chassisVin: '',
      pointOfImpact: '',
      bodyDamage: '',
      staticTestConducted: false,
      defectsFromCrash: false,
      certificateOfDefectNo: '',
      heavilyTinted: false
    },
    // Vehicle Conditions
    vehicle1Condition: {
      wheelsTyres: '',
      windscreen: '',
      brakingSystem: '',
      suspension: '',
      steering: '',
      chassisFrame: '',
      lightsElectrical: '',
      bodyCondition: '',
      other: '',
      crashResultOfDefect: false,
      defectCertificateNo: ''
    },
    vehicle2Condition: {
      wheelsTyres: '',
      windscreen: '',
      brakingSystem: '',
      suspension: '',
      steering: '',
      chassisFrame: '',
      lightsElectrical: '',
      bodyCondition: '',
      other: '',
      crashResultOfDefect: false,
      defectCertificateNo: ''
    },
    // Additional Data
    additionalNotes: '',
    totalPages: 1,
    attachmentsCount: 0,
    officerSignatureDate: new Date().toISOString().split('T')[0]
  });

  const [reports, setReports] = useState([]);
  const [showReports, setShowReports] = useState(false);

  const steps = [
    'Officer Details',
    'Request & Crash Info',
    'Vehicle 1 Details',
    'Vehicle 2 Details',
    'Vehicle Conditions',
    'Additional Notes',
    'Review & Submit'
  ];

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleDirectInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitReport = async () => {
    try {
      const reportId = `RPT-${Date.now()}`;
      const reportData = {
        report_id: reportId,
        crash_date: formData.crashDate,
        crash_location: formData.crashLocation,
        officer_details: {
          name: formData.officerDetails.name,
          occupation: formData.officerDetails.occupation,
          address: formData.officerDetails.address,
          current_duties: formData.officerDetails.currentDuties,
          age: parseInt(formData.officerDetails.age) || 0,
          years_of_service: parseInt(formData.officerDetails.yearsOfService) || 0,
          contact: formData.officerDetails.contact,
          education: formData.officerDetails.education,
          certifying_statement: formData.officerDetails.certifyingStatement,
          service_hub: formData.officerDetails.serviceHub,
          parish: formData.officerDetails.parish
        },
        request_details: {
          rank: formData.requestDetails.rank,
          name: formData.requestDetails.name,
          assigned_station: formData.requestDetails.assignedStation,
          parish: formData.requestDetails.parish,
          date: formData.requestDetails.date,
          location_other_than_station: formData.requestDetails.locationOtherThanStation
        },
        vehicle1: {
          vehicle_class: formData.vehicle1.vehicleClass,
          driver_name: formData.vehicle1.driverName,
          driver_address: formData.vehicle1.driverAddress,
          driver_tel: formData.vehicle1.driverTel,
          driver_trn: formData.vehicle1.driverTrn,
          owner_name: formData.vehicle1.ownerName,
          owner_address: formData.vehicle1.ownerAddress,
          owner_tel: formData.vehicle1.ownerTel,
          owner_trn: formData.vehicle1.ownerTrn,
          make: formData.vehicle1.make,
          model: formData.vehicle1.model,
          year: formData.vehicle1.year,
          plate_number: formData.vehicle1.plateNumber,
          chassis_vin: formData.vehicle1.chassisVin,
          point_of_impact: formData.vehicle1.pointOfImpact,
          body_damage: formData.vehicle1.bodyDamage,
          static_test_conducted: formData.vehicle1.staticTestConducted,
          defects_from_crash: formData.vehicle1.defectsFromCrash,
          certificate_of_defect_no: formData.vehicle1.certificateOfDefectNo,
          heavily_tinted: formData.vehicle1.heavilyTinted
        },
        vehicle2: formData.vehicle2.driverName ? {
          vehicle_class: formData.vehicle2.vehicleClass,
          driver_name: formData.vehicle2.driverName,
          driver_address: formData.vehicle2.driverAddress,
          driver_tel: formData.vehicle2.driverTel,
          driver_trn: formData.vehicle2.driverTrn,
          owner_name: formData.vehicle2.ownerName,
          owner_address: formData.vehicle2.ownerAddress,
          owner_tel: formData.vehicle2.ownerTel,
          owner_trn: formData.vehicle2.ownerTrn,
          make: formData.vehicle2.make,
          model: formData.vehicle2.model,
          year: formData.vehicle2.year,
          plate_number: formData.vehicle2.plateNumber,
          chassis_vin: formData.vehicle2.chassisVin,
          point_of_impact: formData.vehicle2.pointOfImpact,
          body_damage: formData.vehicle2.bodyDamage,
          static_test_conducted: formData.vehicle2.staticTestConducted,
          defects_from_crash: formData.vehicle2.defectsFromCrash,
          certificate_of_defect_no: formData.vehicle2.certificateOfDefectNo,
          heavily_tinted: formData.vehicle2.heavilyTinted
        } : null,
        vehicle1_condition: {
          wheels_tyres: formData.vehicle1Condition.wheelsTyres,
          windscreen: formData.vehicle1Condition.windscreen,
          braking_system: formData.vehicle1Condition.brakingSystem,
          suspension: formData.vehicle1Condition.suspension,
          steering: formData.vehicle1Condition.steering,
          chassis_frame: formData.vehicle1Condition.chassisFrame,
          lights_electrical: formData.vehicle1Condition.lightsElectrical,
          body_condition: formData.vehicle1Condition.bodyCondition,
          other: formData.vehicle1Condition.other,
          crash_result_of_defect: formData.vehicle1Condition.crashResultOfDefect,
          defect_certificate_no: formData.vehicle1Condition.defectCertificateNo
        },
        vehicle2_condition: formData.vehicle2.driverName ? {
          wheels_tyres: formData.vehicle2Condition.wheelsTyres,
          windscreen: formData.vehicle2Condition.windscreen,
          braking_system: formData.vehicle2Condition.brakingSystem,
          suspension: formData.vehicle2Condition.suspension,
          steering: formData.vehicle2Condition.steering,
          chassis_frame: formData.vehicle2Condition.chassisFrame,
          lights_electrical: formData.vehicle2Condition.lightsElectrical,
          body_condition: formData.vehicle2Condition.bodyCondition,
          other: formData.vehicle2Condition.other,
          crash_result_of_defect: formData.vehicle2Condition.crashResultOfDefect,
          defect_certificate_no: formData.vehicle2Condition.defectCertificateNo
        } : null,
        additional_notes: formData.additionalNotes,
        total_pages: formData.totalPages,
        attachments_count: formData.attachmentsCount,
        officer_signature_date: formData.officerSignatureDate,
        created_at: new Date().toISOString()
      };

      const response = await fetch(`${BACKEND_URL}/api/accident-reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        alert('Accident report submitted successfully!');
        // Reset form
        setCurrentStep(1);
        setFormData({
          officerDetails: { name: '', occupation: '', address: '', currentDuties: '', age: '', yearsOfService: '', contact: '', education: '', certifyingStatement: '', serviceHub: '', parish: '' },
          requestDetails: { rank: '', name: '', assignedStation: '', parish: '', date: '', locationOtherThanStation: '' },
          crashDate: '', crashLocation: '',
          vehicle1: { vehicleClass: 'Private', driverName: '', driverAddress: '', driverTel: '', driverTrn: '', ownerName: '', ownerAddress: '', ownerTel: '', ownerTrn: '', make: '', model: '', year: '', plateNumber: '', chassisVin: '', pointOfImpact: '', bodyDamage: '', staticTestConducted: false, defectsFromCrash: false, certificateOfDefectNo: '', heavilyTinted: false },
          vehicle2: { vehicleClass: 'Private', driverName: '', driverAddress: '', driverTel: '', driverTrn: '', ownerName: '', ownerAddress: '', ownerTel: '', ownerTrn: '', make: '', model: '', year: '', plateNumber: '', chassisVin: '', pointOfImpact: '', bodyDamage: '', staticTestConducted: false, defectsFromCrash: false, certificateOfDefectNo: '', heavilyTinted: false },
          vehicle1Condition: { wheelsTyres: '', windscreen: '', brakingSystem: '', suspension: '', steering: '', chassisFrame: '', lightsElectrical: '', bodyCondition: '', other: '', crashResultOfDefect: false, defectCertificateNo: '' },
          vehicle2Condition: { wheelsTyres: '', windscreen: '', brakingSystem: '', suspension: '', steering: '', chassisFrame: '', lightsElectrical: '', bodyCondition: '', other: '', crashResultOfDefect: false, defectCertificateNo: '' },
          additionalNotes: '', totalPages: 1, attachmentsCount: 0, officerSignatureDate: new Date().toISOString().split('T')[0]
        });
      } else {
        alert('Error submitting report. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Error submitting report. Please try again.');
    }
  };

  const fetchReports = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/accident-reports`);
      if (response.ok) {
        const data = await response.json();
        setReports(data);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  useEffect(() => {
    if (showReports) {
      fetchReports();
    }
  }, [showReports]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Officer Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.officerDetails.name}
                  onChange={(e) => handleInputChange('officerDetails', 'name', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                <input
                  type="text"
                  value={formData.officerDetails.occupation}
                  onChange={(e) => handleInputChange('officerDetails', 'occupation', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={formData.officerDetails.address}
                  onChange={(e) => handleInputChange('officerDetails', 'address', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Duties</label>
                <input
                  type="text"
                  value={formData.officerDetails.currentDuties}
                  onChange={(e) => handleInputChange('officerDetails', 'currentDuties', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={formData.officerDetails.age}
                  onChange={(e) => handleInputChange('officerDetails', 'age', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Service</label>
                <input
                  type="number"
                  value={formData.officerDetails.yearsOfService}
                  onChange={(e) => handleInputChange('officerDetails', 'yearsOfService', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                <input
                  type="text"
                  value={formData.officerDetails.contact}
                  onChange={(e) => handleInputChange('officerDetails', 'contact', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                <input
                  type="text"
                  value={formData.officerDetails.education}
                  onChange={(e) => handleInputChange('officerDetails', 'education', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Hub</label>
                <input
                  type="text"
                  value={formData.officerDetails.serviceHub}
                  onChange={(e) => handleInputChange('officerDetails', 'serviceHub', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parish</label>
                <input
                  type="text"
                  value={formData.officerDetails.parish}
                  onChange={(e) => handleInputChange('officerDetails', 'parish', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Certifying Statement</label>
              <textarea
                value={formData.officerDetails.certifyingStatement}
                onChange={(e) => handleInputChange('officerDetails', 'certifyingStatement', e.target.value)}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="I [NAME] AM A CERTIFYING OFFICER OF MOTOR VEHICLES..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Request & Crash Information</h2>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Request Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rank</label>
                  <input
                    type="text"
                    value={formData.requestDetails.rank}
                    onChange={(e) => handleInputChange('requestDetails', 'rank', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.requestDetails.name}
                    onChange={(e) => handleInputChange('requestDetails', 'name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Station</label>
                  <input
                    type="text"
                    value={formData.requestDetails.assignedStation}
                    onChange={(e) => handleInputChange('requestDetails', 'assignedStation', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parish</label>
                  <input
                    type="text"
                    value={formData.requestDetails.parish}
                    onChange={(e) => handleInputChange('requestDetails', 'parish', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.requestDetails.date}
                    onChange={(e) => handleInputChange('requestDetails', 'date', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location Other Than Station</label>
                  <input
                    type="text"
                    value={formData.requestDetails.locationOtherThanStation}
                    onChange={(e) => handleInputChange('requestDetails', 'locationOtherThanStation', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Crash Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Crash Date</label>
                  <input
                    type="date"
                    value={formData.crashDate}
                    onChange={(e) => handleDirectInputChange('crashDate', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Crash Location</label>
                  <input
                    type="text"
                    value={formData.crashLocation}
                    onChange={(e) => handleDirectInputChange('crashLocation', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Detailed crash location"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Vehicle 1 Details</h2>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Driver Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Class</label>
                  <select
                    value={formData.vehicle1.vehicleClass}
                    onChange={(e) => handleInputChange('vehicle1', 'vehicleClass', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="PPV">PPV</option>
                    <option value="CC">CC</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Driver Name</label>
                  <input
                    type="text"
                    value={formData.vehicle1.driverName}
                    onChange={(e) => handleInputChange('vehicle1', 'driverName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Driver Address</label>
                  <input
                    type="text"
                    value={formData.vehicle1.driverAddress}
                    onChange={(e) => handleInputChange('vehicle1', 'driverAddress', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Driver Phone</label>
                  <input
                    type="text"
                    value={formData.vehicle1.driverTel}
                    onChange={(e) => handleInputChange('vehicle1', 'driverTel', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Driver TRN#</label>
                  <input
                    type="text"
                    value={formData.vehicle1.driverTrn}
                    onChange={(e) => handleInputChange('vehicle1', 'driverTrn', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Owner Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name</label>
                  <input
                    type="text"
                    value={formData.vehicle1.ownerName}
                    onChange={(e) => handleInputChange('vehicle1', 'ownerName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Owner Address</label>
                  <input
                    type="text"
                    value={formData.vehicle1.ownerAddress}
                    onChange={(e) => handleInputChange('vehicle1', 'ownerAddress', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Owner Phone</label>
                  <input
                    type="text"
                    value={formData.vehicle1.ownerTel}
                    onChange={(e) => handleInputChange('vehicle1', 'ownerTel', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Owner TRN#</label>
                  <input
                    type="text"
                    value={formData.vehicle1.ownerTrn}
                    onChange={(e) => handleInputChange('vehicle1', 'ownerTrn', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Vehicle Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                  <input
                    type="text"
                    value={formData.vehicle1.make}
                    onChange={(e) => handleInputChange('vehicle1', 'make', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                  <input
                    type="text"
                    value={formData.vehicle1.model}
                    onChange={(e) => handleInputChange('vehicle1', 'model', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input
                    type="text"
                    value={formData.vehicle1.year}
                    onChange={(e) => handleInputChange('vehicle1', 'year', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plate Number</label>
                  <input
                    type="text"
                    value={formData.vehicle1.plateNumber}
                    onChange={(e) => handleInputChange('vehicle1', 'plateNumber', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chassis/VIN</label>
                  <input
                    type="text"
                    value={formData.vehicle1.chassisVin}
                    onChange={(e) => handleInputChange('vehicle1', 'chassisVin', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Damage Assessment</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Point of Impact</label>
                  <textarea
                    value={formData.vehicle1.pointOfImpact}
                    onChange={(e) => handleInputChange('vehicle1', 'pointOfImpact', e.target.value)}
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Body Damage Description</label>
                  <textarea
                    value={formData.vehicle1.bodyDamage}
                    onChange={(e) => handleInputChange('vehicle1', 'bodyDamage', e.target.value)}
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.vehicle1.staticTestConducted}
                      onChange={(e) => handleInputChange('vehicle1', 'staticTestConducted', e.target.checked)}
                      className="h-5 w-5 text-blue-600"
                    />
                    <label className="text-sm font-medium text-gray-700">Static Test Conducted</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.vehicle1.defectsFromCrash}
                      onChange={(e) => handleInputChange('vehicle1', 'defectsFromCrash', e.target.checked)}
                      className="h-5 w-5 text-blue-600"
                    />
                    <label className="text-sm font-medium text-gray-700">Defects from Crash</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.vehicle1.heavilyTinted}
                      onChange={(e) => handleInputChange('vehicle1', 'heavilyTinted', e.target.checked)}
                      className="h-5 w-5 text-blue-600"
                    />
                    <label className="text-sm font-medium text-gray-700">Heavily Tinted</label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Certificate of Defect No.</label>
                  <input
                    type="text"
                    value={formData.vehicle1.certificateOfDefectNo}
                    onChange={(e) => handleInputChange('vehicle1', 'certificateOfDefectNo', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Vehicle 2 Details (Optional)</h2>
            <p className="text-gray-600 mb-4">If there's a second vehicle involved, please fill out the details below. Otherwise, leave blank and continue.</p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Driver Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Class</label>
                  <select
                    value={formData.vehicle2.vehicleClass}
                    onChange={(e) => handleInputChange('vehicle2', 'vehicleClass', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="PPV">PPV</option>
                    <option value="CC">CC</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Driver Name</label>
                  <input
                    type="text"
                    value={formData.vehicle2.driverName}
                    onChange={(e) => handleInputChange('vehicle2', 'driverName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Driver Address</label>
                  <input
                    type="text"
                    value={formData.vehicle2.driverAddress}
                    onChange={(e) => handleInputChange('vehicle2', 'driverAddress', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Driver Phone</label>
                  <input
                    type="text"
                    value={formData.vehicle2.driverTel}
                    onChange={(e) => handleInputChange('vehicle2', 'driverTel', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Driver TRN#</label>
                  <input
                    type="text"
                    value={formData.vehicle2.driverTrn}
                    onChange={(e) => handleInputChange('vehicle2', 'driverTrn', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {formData.vehicle2.driverName && (
              <>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Owner Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name</label>
                      <input
                        type="text"
                        value={formData.vehicle2.ownerName}
                        onChange={(e) => handleInputChange('vehicle2', 'ownerName', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Owner Address</label>
                      <input
                        type="text"
                        value={formData.vehicle2.ownerAddress}
                        onChange={(e) => handleInputChange('vehicle2', 'ownerAddress', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Owner Phone</label>
                      <input
                        type="text"
                        value={formData.vehicle2.ownerTel}
                        onChange={(e) => handleInputChange('vehicle2', 'ownerTel', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Owner TRN#</label>
                      <input
                        type="text"
                        value={formData.vehicle2.ownerTrn}
                        onChange={(e) => handleInputChange('vehicle2', 'ownerTrn', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Vehicle Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                      <input
                        type="text"
                        value={formData.vehicle2.make}
                        onChange={(e) => handleInputChange('vehicle2', 'make', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                      <input
                        type="text"
                        value={formData.vehicle2.model}
                        onChange={(e) => handleInputChange('vehicle2', 'model', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                      <input
                        type="text"
                        value={formData.vehicle2.year}
                        onChange={(e) => handleInputChange('vehicle2', 'year', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Plate Number</label>
                      <input
                        type="text"
                        value={formData.vehicle2.plateNumber}
                        onChange={(e) => handleInputChange('vehicle2', 'plateNumber', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Chassis/VIN</label>
                      <input
                        type="text"
                        value={formData.vehicle2.chassisVin}
                        onChange={(e) => handleInputChange('vehicle2', 'chassisVin', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Damage Assessment</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Point of Impact</label>
                      <textarea
                        value={formData.vehicle2.pointOfImpact}
                        onChange={(e) => handleInputChange('vehicle2', 'pointOfImpact', e.target.value)}
                        rows="3"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Body Damage Description</label>
                      <textarea
                        value={formData.vehicle2.bodyDamage}
                        onChange={(e) => handleInputChange('vehicle2', 'bodyDamage', e.target.value)}
                        rows="3"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.vehicle2.staticTestConducted}
                          onChange={(e) => handleInputChange('vehicle2', 'staticTestConducted', e.target.checked)}
                          className="h-5 w-5 text-blue-600"
                        />
                        <label className="text-sm font-medium text-gray-700">Static Test Conducted</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.vehicle2.defectsFromCrash}
                          onChange={(e) => handleInputChange('vehicle2', 'defectsFromCrash', e.target.checked)}
                          className="h-5 w-5 text-blue-600"
                        />
                        <label className="text-sm font-medium text-gray-700">Defects from Crash</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.vehicle2.heavilyTinted}
                          onChange={(e) => handleInputChange('vehicle2', 'heavilyTinted', e.target.checked)}
                          className="h-5 w-5 text-blue-600"
                        />
                        <label className="text-sm font-medium text-gray-700">Heavily Tinted</label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certificate of Defect No.</label>
                      <input
                        type="text"
                        value={formData.vehicle2.certificateOfDefectNo}
                        onChange={(e) => handleInputChange('vehicle2', 'certificateOfDefectNo', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Vehicle Conditions Assessment</h2>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Vehicle 1 Condition</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wheels & Tyres</label>
                  <textarea
                    value={formData.vehicle1Condition.wheelsTyres}
                    onChange={(e) => handleInputChange('vehicle1Condition', 'wheelsTyres', e.target.value)}
                    rows="2"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Windscreen</label>
                  <textarea
                    value={formData.vehicle1Condition.windscreen}
                    onChange={(e) => handleInputChange('vehicle1Condition', 'windscreen', e.target.value)}
                    rows="2"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Braking System</label>
                  <textarea
                    value={formData.vehicle1Condition.brakingSystem}
                    onChange={(e) => handleInputChange('vehicle1Condition', 'brakingSystem', e.target.value)}
                    rows="2"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Suspension</label>
                  <textarea
                    value={formData.vehicle1Condition.suspension}
                    onChange={(e) => handleInputChange('vehicle1Condition', 'suspension', e.target.value)}
                    rows="2"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Steering</label>
                  <textarea
                    value={formData.vehicle1Condition.steering}
                    onChange={(e) => handleInputChange('vehicle1Condition', 'steering', e.target.value)}
                    rows="2"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chassis & Frame</label>
                  <textarea
                    value={formData.vehicle1Condition.chassisFrame}
                    onChange={(e) => handleInputChange('vehicle1Condition', 'chassisFrame', e.target.value)}
                    rows="2"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lights & Electrical</label>
                  <textarea
                    value={formData.vehicle1Condition.lightsElectrical}
                    onChange={(e) => handleInputChange('vehicle1Condition', 'lightsElectrical', e.target.value)}
                    rows="2"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Body Condition</label>
                  <textarea
                    value={formData.vehicle1Condition.bodyCondition}
                    onChange={(e) => handleInputChange('vehicle1Condition', 'bodyCondition', e.target.value)}
                    rows="2"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Other</label>
                  <textarea
                    value={formData.vehicle1Condition.other}
                    onChange={(e) => handleInputChange('vehicle1Condition', 'other', e.target.value)}
                    rows="2"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.vehicle1Condition.crashResultOfDefect}
                    onChange={(e) => handleInputChange('vehicle1Condition', 'crashResultOfDefect', e.target.checked)}
                    className="h-5 w-5 text-blue-600"
                  />
                  <label className="text-sm font-medium text-gray-700">Crash result of defect</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Defect Certificate No.</label>
                  <input
                    type="text"
                    value={formData.vehicle1Condition.defectCertificateNo}
                    onChange={(e) => handleInputChange('vehicle1Condition', 'defectCertificateNo', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {formData.vehicle2.driverName && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Vehicle 2 Condition</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Wheels & Tyres</label>
                    <textarea
                      value={formData.vehicle2Condition.wheelsTyres}
                      onChange={(e) => handleInputChange('vehicle2Condition', 'wheelsTyres', e.target.value)}
                      rows="2"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Windscreen</label>
                    <textarea
                      value={formData.vehicle2Condition.windscreen}
                      onChange={(e) => handleInputChange('vehicle2Condition', 'windscreen', e.target.value)}
                      rows="2"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Braking System</label>
                    <textarea
                      value={formData.vehicle2Condition.brakingSystem}
                      onChange={(e) => handleInputChange('vehicle2Condition', 'brakingSystem', e.target.value)}
                      rows="2"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Suspension</label>
                    <textarea
                      value={formData.vehicle2Condition.suspension}
                      onChange={(e) => handleInputChange('vehicle2Condition', 'suspension', e.target.value)}
                      rows="2"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Steering</label>
                    <textarea
                      value={formData.vehicle2Condition.steering}
                      onChange={(e) => handleInputChange('vehicle2Condition', 'steering', e.target.value)}
                      rows="2"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chassis & Frame</label>
                    <textarea
                      value={formData.vehicle2Condition.chassisFrame}
                      onChange={(e) => handleInputChange('vehicle2Condition', 'chassisFrame', e.target.value)}
                      rows="2"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lights & Electrical</label>
                    <textarea
                      value={formData.vehicle2Condition.lightsElectrical}
                      onChange={(e) => handleInputChange('vehicle2Condition', 'lightsElectrical', e.target.value)}
                      rows="2"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Body Condition</label>
                    <textarea
                      value={formData.vehicle2Condition.bodyCondition}
                      onChange={(e) => handleInputChange('vehicle2Condition', 'bodyCondition', e.target.value)}
                      rows="2"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Other</label>
                    <textarea
                      value={formData.vehicle2Condition.other}
                      onChange={(e) => handleInputChange('vehicle2Condition', 'other', e.target.value)}
                      rows="2"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.vehicle2Condition.crashResultOfDefect}
                      onChange={(e) => handleInputChange('vehicle2Condition', 'crashResultOfDefect', e.target.checked)}
                      className="h-5 w-5 text-blue-600"
                    />
                    <label className="text-sm font-medium text-gray-700">Crash result of defect</label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Defect Certificate No.</label>
                    <input
                      type="text"
                      value={formData.vehicle2Condition.defectCertificateNo}
                      onChange={(e) => handleInputChange('vehicle2Condition', 'defectCertificateNo', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Additional Notes & Certification</h2>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Additional Notes</h3>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) => handleDirectInputChange('additionalNotes', e.target.value)}
                rows="8"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter any additional notes, observations, or details about the accident..."
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Report Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Pages</label>
                  <input
                    type="number"
                    value={formData.totalPages}
                    onChange={(e) => handleDirectInputChange('totalPages', parseInt(e.target.value) || 1)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attachments Count</label>
                  <input
                    type="number"
                    value={formData.attachmentsCount}
                    onChange={(e) => handleDirectInputChange('attachmentsCount', parseInt(e.target.value) || 0)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Officer Signature Date</label>
                  <input
                    type="date"
                    value={formData.officerSignatureDate}
                    onChange={(e) => handleDirectInputChange('officerSignatureDate', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Certification Statement:</strong> This statement consisting of the specified pages and attachments 
                each signed by me is true to the best of my knowledge and belief and I make it knowing that if it is tendered 
                in evidence I shall be liable to prosecution if I have wilfully stated in it anything I know to be false or do 
                not believe to be true.
              </p>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Review & Submit Report</h2>
            
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Report Summary</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p><strong>Officer:</strong> {formData.officerDetails.name}</p>
                <p><strong>Crash Date:</strong> {formData.crashDate}</p>
                <p><strong>Location:</strong> {formData.crashLocation}</p>
                <p><strong>Vehicle 1:</strong> {formData.vehicle1.make} {formData.vehicle1.model} ({formData.vehicle1.plateNumber})</p>
                {formData.vehicle2.driverName && (
                  <p><strong>Vehicle 2:</strong> {formData.vehicle2.make} {formData.vehicle2.model} ({formData.vehicle2.plateNumber})</p>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Complete Report Data</h3>
              <pre className="text-xs bg-white p-4 rounded border overflow-auto max-h-96">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <p className="text-green-800">
                Please review all the information above before submitting. Once submitted, this accident report will be saved to the system.
              </p>
            </div>
          </div>
        );

      default:
        return <div>Invalid step</div>;
    }
  };

  if (showReports) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Accident Reports</h1>
              <button
                onClick={() => setShowReports(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                New Report
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Crash Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Officer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {report.report_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.crash_date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.crash_location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.officer_details?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(report.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {reports.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No accident reports found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="bg-blue-600 text-white p-6 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">ACCIDENT / CRASH REPORT</h1>
                <p className="text-blue-100">Island Traffic Authority - Version 1.01</p>
              </div>
              <button
                onClick={() => setShowReports(true)}
                className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg"
              >
                View Reports
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-medium text-gray-700">{currentStep} of {steps.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-600">{steps[currentStep - 1]}</span>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={submitReport}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Submit Report
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;