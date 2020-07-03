class Api::BoozesController < ApplicationController

  def index
    render json: Booze.all
  end

  def show 
    render json: Booze.find(params[:id])
  end

  def create
    booze = Booze.new(booze_params)
    if booze.save
      render json: booze
    else
      render json: { meesage: "Unable to create Booze"}
  end
end

  def update
    booze = Booze.find(params[:id])
    if booze.update(booze_params)
      render json: booze
    else
      render json: { meesage: "Unable to create Booze"}
  end
end


  def destroy
    Booze.find(params[:id]).destroy
    render json: { message: "Destroyed the BOOZE!" }
  end

  private

  def booze_params
    params.require(:booze).permit(:name, :production, :history)
  end

end
