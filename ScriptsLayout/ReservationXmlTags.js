// File: Reservation\scripts\ReservationXmlTags.js

// Tags and XML string values

// Premises
var g_tag_premises_width = "PremisesWidth";
var g_tag_premises_height = "PremisesHeight";

var g_tag_table_color = "TableColor";
var g_tag_table_stroke_color = "TableStrokeColor";
var g_tag_table_stroke_width = "TableStrokeWidth";
var g_tag_table_text_rel_x_procent = "TableTextRelXProcent";
var g_tag_table_text_rel_y_procent = "TableTextRelYProcent";
var g_tag_table_text_color = "TableTextColor";

// Stage
var g_tag_stage_upper_left_x = "StageUpperLeftX";
var g_tag_stage_upper_left_y = "StageUpperLeftY";
var g_tag_stage_width = "StageWidth";
var g_tag_stage_height = "StageHeight";
var g_tag_stage_text = "StageText";
var g_tag_stage_color = "StageColor";
var g_tag_stage_stroke_color = "StageStrokeColor";
var g_tag_stage_stroke_width = "StageStrokeWidth";
var g_tag_stage_text_rel_x_procent = "StageTextRelXProcent"; 
var g_tag_stage_text_rel_y_procent = "StageTextRelyProcent";
var g_tag_stage_text_color = "StageTextColor";  
var g_tag_stage_image = "StageImage";
var g_tag_stage_image_width = "StageImageWidth";
var g_tag_stage_image_height = "StageImageHeight";

// Cash desk
var g_tag_cash_upper_left_x = "CashUpperLeftX";
var g_tag_cash_upper_left_y = "CashUpperLeftY";
var g_tag_cash_image = "CashImage";
var g_tag_cash_image_width = "CashImageWidth";
var g_tag_cash_image_height = "CashImageHeight";

// Text images
var g_tag_text_image_select_seats = "TextImageSelectSeats";
var g_tag_text_image_reserve_seats = "TextImageReserveSeats";
var g_tag_text_image_reserve_select_undef = "TextImageReserveSelectUndef";
var g_tag_text_image_add_reservation = "TextImageAddReservation";
var g_tag_text_image_delete_off = "TextImageDeleteOff";
var g_tag_text_image_delete_on = "TextImageDeleteOn";
var g_tag_text_image_reservation_list = "TextImageReservationList";
var g_tag_text_image_reservation_print = "TextImageReservationPrint";
var g_tag_text_image_save_reservation = "TextImageSaveReservation";
var g_tag_text_image_save_reservation_white = "TextImageSaveReservationWhite";

// Maximum number of reservations in procent
var g_tag_max_n_seats_procent = "MaxReservationsProcent";
 
// Tables
var g_tag_group_table = "TableGroup";
var g_tag_table = "Table";
var g_tag_table_number = "Number";
var g_tag_upper_left_x = "UpperLeftX";
var g_tag_upper_left_y = "UpperLeftY";
var g_tag_width = "Width";
var g_tag_height = "Height";
var g_tag_text = "Text";
var g_tag_number_left_right_seats = "NumberLeftRightSeats";
var g_tag_seat_upper = "SeatUpper";
var g_tag_seat_lower = "SeatLower";
var g_tag_seat_one_left = "SeatOneLeft";
var g_tag_seat_one_right = "SeatOneRight";
var g_tag_seat_two_left = "SeatTwoLeft";
var g_tag_seat_two_right = "SeatTwoRight";
var g_tag_seat_three_left = "SeatThreeLeft";
var g_tag_seat_three_right = "SeatThreeRight";
var g_tag_seat_four_left = "SeatFourLeft";
var g_tag_seat_four_right = "SeatFourRight";
var g_tag_seat_five_left = "SeatFiveLeft";
var g_tag_seat_five_right = "SeatFiveRight";
var g_tag_seat_six_left = "SeatSixLeft";
var g_tag_seat_six_right = "SeatSixRight";
var g_tag_seat_seven_left = "SeatSevenLeft";
var g_tag_seat_seven_right = "SeatSevenRight";
var g_tag_seat_eight_left = "SeatEightLeft";
var g_tag_seat_eight_right = "SeatEightRight";
var g_tag_seat_nine_left = "SeatNineLeft";
var g_tag_seat_nine_right = "SeatNineRight";
var g_tag_seat_ten_left = "SeatTenLeft";
var g_tag_seat_ten_right = "SeatTenRight";
var g_tag_seat_eleven_left = "SeatElevenLeft";
var g_tag_seat_eleven_right = "SeatElevenRight";
var g_tag_seat_twelve_left = "SeatTwelveLeft";
var g_tag_seat_twelve_right = "SeatTwelveRight";
var g_tag_seat_thirteen_left = "SeatThirteenLeft";
var g_tag_seat_thirteen_right = "SeatThirteenRight";
var g_tag_seat_fourteen_left = "SeatFourteenLeft";
var g_tag_seat_fourteen_right = "SeatFourteenRight";
var g_tag_seat_fifteen_left = "SeatFifteenLeft";
var g_tag_seat_fifteen_right = "SeatFifteenRight";
var g_tag_seat_sixteen_left = "SeatSixteenLeft";
var g_tag_seat_sixteen_right = "SeatSixteenRight";
var g_tag_seat_seventeen_left = "SeatSeventeenLeft";
var g_tag_seat_seventeen_right = "SeatSeventeenRight";
var g_tag_seat_eighteen_left = "SeatEighteenLeft";
var g_tag_seat_eighteen_right = "SeatEighteenRight";
var g_tag_seat_nineteen_left = "SeatNineteenLeft";
var g_tag_seat_nineteen_right = "SeatNineteenRight";
var g_tag_seat_twenty_left = "SeatTwentyLeft";
var g_tag_seat_twenty_right = "SeatTwentyRight";


// Doors
var g_tag_door = "Door";
var g_tag_door_type = "DoorType";
var g_tag_door_position = "DoorPosition"; 
var g_tag_door_height = "DoorHeight";
var g_tag_door_text = "DoorText";
var g_tag_door_image = "DoorImage";
var g_tag_door_image_width = "DoorImageWidth";
var g_tag_door_image_height = "DoorImageHeight";


// Concerts. 
// Just one character tags because there is a limit of data  
// that can be passed to a PHP page (CreateXml.php)
var g_tag_reservations = "H";
var g_tag_day = "D";
var g_tag_month = "M";
var g_tag_year = "Y";
var g_tag_band_name = "B";
var g_tag_reservation = "R";
var g_tag_reservation_name = "N";
var g_tag_reservation_remark = "A";
var g_tag_reservation_email = "E";
var g_tag_seat = "S";
var g_tag_seat_table_number = "T";
var g_tag_seat_character = "C";


// Tag names for the season program XML	
var g_tag_season_program_concert = "Concert";	
var g_tag_season_program_day = "Day";
var g_tag_season_program_month = "Month";
var g_tag_season_program_year = "Year";
var g_tag_season_program_band_name = "BandName";



// XML strings
var g_xml_start_line = "<?xml version= \"1.0\" encoding=\"utf-8\"?>";
var g_xml_file_header_comment = "<!--  JAZZ live AARAU Spaghetty Factory Salmen Concert reservations -->";

// New (HTML) line 
var g_list_new_line = "<br>";

// XML element values are not allowed to be empty (in this application)
// This string defines a not set value
var g_not_yet_set_value = "NotYetSetNodeValue";
var g_reservations_not_yet_set_value = "NYSV";

