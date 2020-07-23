class Api::BoozesController < ApplicationController

  def index
    render json: Booze.all
  end

  def booze_drinks
    render json: Booze.find(params[:id]).drinks
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

  def booze_audits
    render json:  Booze.find(params[:id]).audits
  end

  def search_boozes
     render json: Booze.search_boozes(params[:search], params[:search], params[:search])
   end

  private

  def booze_params
    params.require(:booze).permit(:name, :production, :history, :is_checked)
  end

end
