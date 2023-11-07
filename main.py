from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# Define a Pydantic model for the request body
class CreateNFTEntryRequest(BaseModel):
    tokenId: int
    propertyAddress: str
    ownerName: str
    areaSquareMeters: float

# Sample data for demonstration
nfts = []

# Create NFT Ownership Entry
@app.post("/api/nft", response_model=dict)
def create_nft_entry(request: CreateNFTEntryRequest):
    global nfts
    nft_data = request.dict()
    nfts.append(nft_data)
    return nft_data

# Get NFT Ownership Details
@app.get("/api/nft/{tokenId}", response_model=dict)
def get_nft_details(tokenId: int):
    for nft in nfts:
        if nft["tokenId"] == tokenId:
            return nft
    raise HTTPException(status_code=404, detail="NFT not found")

# Transfer NFT Ownership
@app.post("/api/nft/transfer", response_model=dict)
def transfer_nft_ownership(request: CreateNFTEntryRequest):
    tokenId = request.tokenId
    toAddress = request.ownerName  # For demonstration, we use ownerName as the recipient's address
    for nft in nfts:
        if nft["tokenId"] == tokenId:
            nft["ownerName"] = toAddress
            return nft
    raise HTTPException(status_code=404, detail="NFT not found")

# List All NFTs
@app.get("/api/nft", response_model=list)
def list_all_nfts():
    return nfts
