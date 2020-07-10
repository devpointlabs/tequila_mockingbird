require 'test_helper'

class Api::BoozedrinksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_boozedrinks_index_url
    assert_response :success
  end

  test "should get update" do
    get api_boozedrinks_update_url
    assert_response :success
  end

end
