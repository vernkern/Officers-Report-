from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import pymongo
import os
import uuid
import json
from datetime import datetime
import shutil
from pathlib import Path

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = pymongo.MongoClient(MONGO_URL)
db = client['accident_reports_db']
reports_collection = db['accident_reports']

# Create uploads directory
uploads_dir = Path("/app/backend/uploads")
uploads_dir.mkdir(exist_ok=True)

# Pydantic models
class OfficerDetails(BaseModel):
    name: str
    occupation: str
    address: str
    current_duties: str
    age: int
    years_of_service: int
    contact: str
    education: str
    certifying_statement: str
    service_hub: str
    parish: str

class RequestDetails(BaseModel):
    rank: str
    name: str
    assigned_station: str
    parish: str
    date: str
    location_other_than_station: str

class VehicleDetails(BaseModel):
    vehicle_class: str  # PPV, CC, Private
    driver_name: str
    driver_address: str
    driver_tel: str
    driver_trn: str
    owner_name: str
    owner_address: str
    owner_tel: str
    owner_trn: str
    make: str
    model: str
    year: str
    plate_number: str
    chassis_vin: str
    point_of_impact: str
    body_damage: str
    static_test_conducted: bool
    defects_from_crash: bool
    certificate_of_defect_no: str
    heavily_tinted: bool

class VehicleCondition(BaseModel):
    wheels_tyres: str
    windscreen: str
    braking_system: str
    suspension: str
    steering: str
    chassis_frame: str
    lights_electrical: str
    body_condition: str
    other: str
    crash_result_of_defect: bool
    defect_certificate_no: str

class AccidentReport(BaseModel):
    report_id: str
    crash_date: str
    crash_location: str
    officer_details: OfficerDetails
    request_details: RequestDetails
    vehicle1: VehicleDetails
    vehicle2: Optional[VehicleDetails] = None
    vehicle1_condition: VehicleCondition
    vehicle2_condition: Optional[VehicleCondition] = None
    additional_notes: str
    total_pages: int
    attachments_count: int
    officer_signature_date: str
    created_at: str

@app.get("/")
async def root():
    return {"message": "Accident Report System API"}

@app.post("/api/accident-reports")
async def create_accident_report(report: AccidentReport):
    try:
        report_dict = report.dict()
        report_dict["_id"] = report.report_id
        result = reports_collection.insert_one(report_dict)
        return {"message": "Accident report created successfully", "report_id": report.report_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/accident-reports")
async def get_accident_reports():
    try:
        reports = list(reports_collection.find({}, {"_id": 0}))
        return reports
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/accident-reports/{report_id}")
async def get_accident_report(report_id: str):
    try:
        report = reports_collection.find_one({"report_id": report_id}, {"_id": 0})
        if not report:
            raise HTTPException(status_code=404, detail="Report not found")
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/upload-image/{report_id}")
async def upload_image(report_id: str, file: UploadFile = File(...), vehicle_number: str = Form(...)):
    try:
        # Create directory for this report
        report_dir = uploads_dir / report_id
        report_dir.mkdir(exist_ok=True)
        
        # Generate unique filename
        file_extension = file.filename.split('.')[-1] if '.' in file.filename else 'jpg'
        filename = f"vehicle_{vehicle_number}_{uuid.uuid4().hex}.{file_extension}"
        file_path = report_dir / filename
        
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        return {"message": "Image uploaded successfully", "filename": filename, "path": str(file_path)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/reports-summary")
async def get_reports_summary():
    try:
        total_reports = reports_collection.count_documents({})
        recent_reports = list(reports_collection.find({}, {"_id": 0, "report_id": 1, "crash_date": 1, "crash_location": 1, "officer_details.name": 1}).sort("created_at", -1).limit(10))
        return {
            "total_reports": total_reports,
            "recent_reports": recent_reports
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)