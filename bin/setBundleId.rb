#!/usr/bin/env ruby

require 'rubygems'
require 'xcodeproj'

WIDGET_EXT='.TodayWidgetExtension'

if File.exist?('./bin/setBundleId.rb')
  # running from node_modules during installation
  project_location = './../../ios/'
  extension_location = './ios/'
else
   # running as bin from root project
  project_location = './ios/'
  extension_location = './node_modules/react-native-today-widget/ios/'
end

# Read values from main project
project_path = Dir.glob("#{project_location}*.{xcodeproj,xcworkspace}").first
  if project_path.nil?
    puts "[WARN] Couldn't find XCode project in '#{project_location}'"
  end
project = Xcodeproj::Project.open(project_path)

app_target = project.targets.find { |t| !t.name['^(?!.*(tvOS|Tests)).*$'] }

build_configuration_list = app_target.build_configuration_list
default_configuration_name = build_configuration_list.default_configuration_name
build_settings = build_configuration_list.build_settings(default_configuration_name)

PRODUCT_BUNDLE_IDENTIFIER = build_settings['PRODUCT_BUNDLE_IDENTIFIER']
PRODUCT_NAME = build_settings['PRODUCT_NAME']

if PRODUCT_BUNDLE_IDENTIFIER
  puts "[INFO] Reading bundle ID from PRODUCT_BUNDLE_IDENTIFIER: #{PRODUCT_BUNDLE_IDENTIFIER}"
  bundle_id_projet = PRODUCT_BUNDLE_IDENTIFIER
else
  INFOPLIST_FILE = build_settings['INFOPLIST_FILE']
  info_plist_project = "#{project_location}#{INFOPLIST_FILE}"
  if info_plist_project.nil?
    puts "[WARN] Couldn't find Info.plist in '#{info_plist_project}'"
  end

  bundle_id_unescaped = Xcodeproj::Plist.read_from_path(info_plist_project)['CFBundleIdentifier']
  puts "[INFO] Reading CFBundleIdentifier from #{info_plist_project}: #{bundle_id_unescaped}"

  # Convert PRODUCT_NAME to same format as rfc1034identifier provide
  converted_product_name = PRODUCT_NAME.gsub(/[^\u0000-\u007F]/) { |non_latin| "#{non_latin}-" }
  converted_product_name.tr!(
    "ÀÁÂÃÄÅàáâãäåĀāĂăĄąÇçĆćĈĉĊċČčÐðĎďĐđÈÉÊËèéêëĒēĔĕĖėĘęĚěĜĝĞğĠġĢ‌​ģĤĥĦħÌÍÎÏìíîïĨĩĪīĬĭĮ‌​įİıĴĵĶķĸĹĺĻļĽľĿŀŁłÑñ‌​ŃńŅņŇňŉŊŋÒÓÔÕÖØòóôõö‌​øŌōŎŏŐőŔŕŖŗŘřŚśŜŝŞşŠ‌​šȘșſŢţŤťŦŧȚțÙÚÛÜùúûü‌​ŨũŪūŬŭŮůŰűŲųŴŵÝýÿŶŷŸ‌​ŹźŻżŽž",
    "AAAAAAaaaaaaAaAaAaCcCcCcCcCcDdDdDdEEEEeeeeEeEeEeEeEeGgGgGgG‌​gHhHhIIIIiiiiIiIiIiI‌​iIiJjKkkLlLlLlLlLlNn‌​NnNnNnnNnOOOOOOooooo‌​oOoOoOoRrRrRrSsSsSsS‌​sSssTtTtTtTtUUUUuuuu‌​UuUuUuUuUuUuWwYyyYyY‌​ZzZzZz"
  )
  converted_product_name.gsub!(/[^\w\d\-+]/, '-')

  bundle_id_projet = bundle_id_unescaped.gsub('$(PRODUCT_NAME:rfc1034identifier)', "#{converted_product_name}")
  if bundle_id_projet != bundle_id_unescaped
    puts "[INFO] Transformed value of bundle ID: #{bundle_id_projet}"
  end
end

bundle_id_extension = "#{bundle_id_projet}#{WIDGET_EXT}"

# Write bundle id to project for extension
info_plist_extension = Dir.glob("#{extension_location}TodayWidgetExtension/Info.plist").first
  if info_plist_extension.nil?
    puts "[WARN] Couldn't find Info.plist in '#{extension_location}TodayWidgetExtension/Info.plist'"
  end
plist_extension = Xcodeproj::Plist.read_from_path(info_plist_extension)
plist_extension['CFBundleIdentifier'] = bundle_id_extension
puts "[INFO] Setting #{bundle_id_extension} as CFBundleIdentifier for #{info_plist_extension}"
Xcodeproj::Plist.write_to_path(plist_extension, info_plist_extension)
