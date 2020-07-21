class Api::BoozedrinksController < ApplicationController
  before_action :set_drink
  before_action :set_boozedrink, only: [:show, :edit, :update, :destroy]

  def index
    render json: @drink.boozedrinks.all
  end

  # def create
   
  #   booze_ids = params[:boozedrink][:booze_id_array].map {|b| {booze_id: b["id"]} } 
  #   boozedrinks = @drink.boozedrinks.create(booze_ids)
    
  #   errors = boozedrinks
  #   .map(&:errors)
  #   .map(&:messages)
  #   .reduce({}, :merge)
    
  #   if errors.empty?
  #     render json: boozedrinks
  #   else
  #     render json: errors
  #   end
  # end

  def create
    boozedrink = @drink.boozedrinks.new(boozedrink_params)

    if boozedrink.save
      render json: boozedrink
    else
      render json: { meesage: "Unable to create Booze"}
    end
  end

  def update
    @boozedrink = @drink.boozedrink.find(params[:id])
    if @drink.boozedrink.update(@drink.boozedrink_params)
      render json: @drink.boozedrink
    else
      render json: { message: "drink not updated" }
    end
  end
      

  def destroy
    @drink.boozedrink.find(params[:id]).destroy
    render json: { mesage: 'Drink Deleted'}
  end
  


  private

  def set_drink
    @drink = Drink.find(params[:drink_id])
  end

  def set_boozedrink
    @boozedrink = @booze.boozedrinks.find(params[:id])
  end
  
  def boozedrink_params
    params.require(:boozedrink).permit(:booze_id, :drink_id, #booze_id_array: []
    )
  end


end

